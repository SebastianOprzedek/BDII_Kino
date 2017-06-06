var filmId;
document.addEventListener("DOMContentLoaded", function(event) {
  updateTable();
  document.getElementById("addFilm").style.display = "none";
  document.getElementById("updateFilm").style.display = "none";
  document.getElementById("photos").style.display = "none";
});

function readImage(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function (e) {
            addImage(e.target.result);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function addImage(image){
  image = image.replace('data:image/png;base64,','')
  image = image.replace('data:image/jpeg;base64,','')
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200){
        updateTable();
      }
    };
    http.open("POST", "/cinema/rest/photo/create/" + filmId, true);
    http.setRequestHeader("Content-Type", "application/json");
    http.send(image);
    document.getElementById("addFilm").style.display = "none";
    document.getElementById("updateFilm").style.display = "none";
    document.getElementById("photos").style.display = "none";
}

function deleteImage(id) {
  var http = new XMLHttpRequest();
  http.open("GET", "/cinema/rest/photo/delete/" + id, true);
  http.send();
}

function addFilm() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
		  updateTable();
  };
  http.open("POST", "/cinema/rest/film/create", true);
  http.setRequestHeader("Content-Type", "application/json");
  var film = new Object();

  if ($('#addFilmDesc').val() == '' || $('#addFilmTitle').val() == ''
   || $('#addFilmYear').val() == '' || $('#addFilmLength').val() == '' || $('#addFilmGenre').val() == ''){
    alert("Dane niekompletne");
  } else if (genre($('#addFilmGenre').val()) == -1){
    alert("Gatunek niepoprawny");
  }
  else {
    film.description = $('#addFilmDesc').val();
    film.title = $('#addFilmTitle').val();
    film.production_year = parseFloat($('#addFilmYear').val());
    film.length = parseFloat($('#addFilmLength').val());
    film.genre = genre($('#addFilmGenre').val());
    http.send(JSON.stringify(film));
  }
  document.getElementById("addFilm").style.display = "none";
}

function updateFilm() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
		  updateTable();
  };
  http.open("POST", "/cinema/rest/film/update", true);
  http.setRequestHeader("Content-Type", "application/json");
  var film = new Object();

  if ($('#updateFilmTitle').val() == '' || $('#updateFilmDesc').val() == ''
   || $('#updateFilmYear').val() == '' || $('#updateFilmLength').val() == '' || $('#updateFilmGenre').val() == ''){
    alert("Dane niekompletne");
  } else if (genre($('#updateFilmGenre').val()) == -1){
    alert("Gatunek niepoprawny");
  }
  else {
    film.id = filmId;
    film.title = $('#updateFilmTitle').val();
    film.description = $('#updateFilmDesc').val();
    film.production_year = parseFloat($('#updateFilmYear').val());
    film.length = parseFloat($('#updateFilmLength').val());
    film.genre = genre($('#updateFilmGenre').val());
    http.send(JSON.stringify(film));
  }
  document.getElementById("updateFilm").style.display = "none";
}

function update(film){
	document.getElementById("addFilm").style.display = "none";
  document.getElementById("updateFilm").style.display = "block";
  document.getElementById("photos").style.display = "none";
	document.getElementById("updateFilmTitle").value = film.title;
	document.getElementById("updateFilmDesc").value = film.description;
	document.getElementById("updateFilmYear").value = film.production_year;
	document.getElementById("updateFilmLength").value = film.length;
	document.getElementById("updateFilmGenre").value = film.genre.name;
}

function showAddFilm(){
  	document.getElementById("addFilm").style.display = "block";
  	document.getElementById("updateFilm").style.display = "none";
    document.getElementById("photos").style.display = "none";
 		document.getElementById("addFilmTitle").value = "";
 		document.getElementById("addFilmDesc").value = "";
 		document.getElementById("addFilmYear").value = "";
 		document.getElementById("addFilmLength").value = "";
 		document.getElementById("addFilmGenre").value = "";
}
function showPhotos(film){
    filmId = film.id;
    document.getElementById("addFilm").style.display = "none";
    document.getElementById("updateFilm").style.display = "none";
    document.getElementById("photos").style.display = "block";
    var photosContainer = document.getElementById("photos-container");
    while (photosContainer.firstChild) {
        photosContainer.removeChild(photosContainer.firstChild);
    }
    photosContainer.style.display = "inline";
    var photos = film.photos;
    for(var i=0; i<photos.length; i++){
      var http = new XMLHttpRequest();
      http.onreadystatechange = (function() {
        var photoObject = photos[i];
        var filmObject = film;
        return function() {
        if (this.readyState == 4){
          var photoDiv = document.createElement("div");
          var photo = document.createElement('img');
          photo.width=200;
          photo.height=289;
          var image = "data:image/png;base64," + this.response;
         	photo.setAttribute("src", image);
          var icon = document.createElement('i');
          icon.classList.add('fa');
          icon.classList.add('fa-trash');
          icon.classList.add('icons-margin');
          icon.classList.add('fa-5x');
          icon.onclick = (function(){
              var film = filmObject;
              var index = filmObject.photos.indexOf(photoObject);
              filmObject.photos.splice(index, 1);
              var idc = photoObject["idc"];
              return function() {
               deleteImage(idc);
           		 updateTable();
               document.getElementById("addFilm").style.display = "none";
               document.getElementById("updateFilm").style.display = "none";
               document.getElementById("photos").style.display = "none";
             }
          })();
          photoDiv.appendChild(photo);
          photoDiv.appendChild(icon);
          photosContainer.appendChild(photoDiv);
        }
      }
      })();
      http.open("GET", "/cinema/rest/photo/find/"+photos[i].idc, true);
      http.setRequestHeader("Content-type", "application/json");
      http.send();
    }
}

// DELETE BY ID
function deleteById(id) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
		updateTable();
  };
  http.open("GET", "/cinema/rest/film/delete/" + id, true);
  http.send();
}

// TABELA NA GÓRZE
function updateTable() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      tableCreate(JSON.parse(this.response)["films"]);
     }
  };
  http.open("GET", "/cinema/rest/film/get", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}

function tableCreate(films){
    var table = document.getElementById("table"),
        tbl  = document.createElement('table');
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
    tbl.style.width  = '100%';
    tbl.classList.add('table');
    tbl.classList.add('table-condensed');

    var tr = document.createElement('tr');
    var td = document.createElement('td');
    td.appendChild(document.createTextNode('Tytuł'));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode('Opis'));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode('Rok produkcji'));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode('Długość'));
    tr.appendChild(td);
    td = document.createElement('td');
    td.appendChild(document.createTextNode('Gatunek'));
    tr.appendChild(td);
    td = document.createElement('td');
    var icon = document.createElement('i');
    icon.classList.add('fa');
    icon.classList.add('fa-plus');
    icon.classList.add('icons-margin');
    icon.onclick = function(){showAddFilm()};
    td.appendChild(icon);
    tr.appendChild(td);
    tbl.appendChild(tr);

    for(var i = 0; i < films.length; i++){
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(films[i]["title"]));
        tr.appendChild(td);
        td = document.createElement('td');
        td.appendChild(document.createTextNode(films[i]["description"]));
        tr.appendChild(td);
        td = document.createElement('td');
        td.appendChild(document.createTextNode(films[i]["production_year"]));
        tr.appendChild(td);
        td = document.createElement('td');
        td.appendChild(document.createTextNode(films[i]["length"]));
        tr.appendChild(td);
        td = document.createElement('td');
        td.appendChild(document.createTextNode(films[i]["genre"]["name"]));
        tr.appendChild(td);
        td = document.createElement('td');
        var icon = document.createElement('i');
        icon.classList.add('fa');
        icon.classList.add('fa-pencil');
        icon.classList.add('icons-margin');
        icon.onclick = (function(){
            var film = films[i];
            return function() {
             update(film);
           }
        })();
        td.appendChild(icon);
        var icon = document.createElement('i');
        icon.classList.add('fa');
        icon.classList.add('fa-trash');
        icon.classList.add('icons-margin');
        icon.onclick = (function(){
            var id = films[i]["id"];
            return function() {
             deleteById(id);
           }
        })();
        td.appendChild(icon);
        var icon = document.createElement('i');
        icon.classList.add('fa');
        icon.classList.add('fa-picture-o');
        icon.classList.add('icons-margin');
        icon.onclick = (function(){
            var film = films[i];
            return function() {
             showPhotos(film);
           }
        })();
        td.appendChild(icon);
        tr.appendChild(td);
        tbl.appendChild(tr);
    }
    table.appendChild(tbl);
}

function genre(genreName) {
  var genre = -1;
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          var genres = JSON.parse(this.response)["genres"];
          for(var i=0;i<genres.length;i++){
          if (genres[i]["name"] == genreName)
            genre = genres[i];
          }
    };
  }
  http.open("GET", "/cinema/rest/genre/get", false);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
  return genre;
}
