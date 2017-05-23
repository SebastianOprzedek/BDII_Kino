var filmId;

document.addEventListener("DOMContentLoaded", function(event) {
  updateTable();
  document.getElementById("addFilm").style.display = "none";
  document.getElementById("updateFilm").style.display = "none";
});

// POST
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
  } else if (genreId($('#addFilmGenre').val()) == -1){
    alert("Gatunek niepoprawny");
  }
  else {
    film.description = document.getElementById("addFilmDesc").value;
    film.title = document.getElementById("addFilmTitle").value;
    film.production_year = parseFloat(document.getElementById("addFilmYear").value);
    film.length = document.getElementById("addFilmLength").value;
    film.genre_id = genreId(document.getElementById("addFilmGenre").value);
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
  } else if (genreId($('#updateFilmGenre').val()) == -1){
    alert("Gatunek niepoprawny");
  }
  else {
    film.id = filmId;
    film.description = document.getElementById("updateFilmDesc").value;
    film.title = document.getElementById("updateFilmTitle").value;
    film.production_year = parseFloat(document.getElementById("updateFilmYear").value);
    film.length = document.getElementById("updateFilmLength").value;
    film.genre_id = genreId(document.getElementById("updateFilmGenre").value);
    http.send(JSON.stringify(film));
  }
  document.getElementById("updateFilm").style.display = "none";
}


function update(id){    
	document.getElementById("addFilm").style.display = "none";
	filmId = id;
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
    {
  		document.getElementById("updateFilm").style.display = "block";
 		var film = JSON.parse(this.response);
 		document.getElementById("updateFilmTitle").value = film.title;
 		document.getElementById("updateFilmDesc").value = film.description;
 		document.getElementById("updateFilmYear").value = film.production_year;
 		document.getElementById("updateFilmLength").value = film.length;
 		document.getElementById("updateFilmGenre").value = genreName(film.genre_id);
    }
	updateTable();
  };
  http.open("GET", "/cinema/rest/film/find/" + id, true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}

function showAddFilm(){	
  		document.getElementById("addFilm").style.display = "block";
  		document.getElementById("updateFilm").style.display = "none";
 		document.getElementById("addFilmTitle").value = "";
 		document.getElementById("addFilmDesc").value = "";
 		document.getElementById("addFilmYear").value = "";
 		document.getElementById("addFilmLength").value = "";
 		document.getElementById("addFilmGenre").value = "";
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
      var films = JSON.parse(this.response)["films"];
      var rows = "";
      rows += "<tr>"+
            "<td><b>Tytuł</b></td>"+
            "<td><b>Opis</b></td>"+
            "<td><b>Rok produkcji</b></td>"+
            "<td><b>Długość</b></td>"+
            "<td><b>Gatunek</b></td>"+
            "<td><a href=\"javascript:showAddFilm();\"><i class=\"fa fa-plus icons-margin\"></i></a></td>"+
            "</tr>";
      for(var i=0;i<films.length;i++){
          rows += "<tr><td>"+films[i]["title"]+"</td><td>"+films[i]["description"]+"</td><td>"+films[i]["production_year"]+"</td><td>"+films[i]["length"]+"</td><td>"+genreName(films[i]["genre_id"])+"</td><td><a href=\"javascript:update("+films[i]["id"]+")\"><i class=\"fa fa-pencil icons-margin\"></i></a><a href=\"javascript:deleteById(" + films[i]["id"] + ");\"><i class=\"fa fa-trash icons-margin\"></i></a></td></tr>";
        }
      document.getElementById("table").innerHTML = "<table class=\"table table-condensed\" width=\"100%\">" + rows + "</table>";
     }
  };
  http.open("GET", "/cinema/rest/film/get", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}


function genreName(id) {
  var name = "";
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      name = JSON.parse(this.response).name;
  };
  http.open("GET", "/cinema/rest/genre/find/" + id, false);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
  return name;
}


function genreId(genreName) {
  var id = -1;
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          var genres = JSON.parse(this.response)["genres"];
          for(var i=0;i<genres.length;i++){
          if (genres[i]["name"] == genreName)
            id = genres[i]["id"];
          }
    };
  }  
  http.open("GET", "/cinema/rest/genre/get", false);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
  return id;  
}