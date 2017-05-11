document.addEventListener("DOMContentLoaded", function(event) {
  updateTable();
});

// POST
function addFilm() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      document.getElementById("resultPost").innerHTML =
      "Result: <br>" + this.responseText;
    else
      document.getElementById("resultPost").innerHTML = "Error";
	updateTable();
  };
  http.open("POST", "/cinema/rest/film/update", true);
  http.setRequestHeader("Content-Type", "application/json");
  var film = new Object();

  if ($('#id').val() == '' || $('#desc').val() == '' || $('#title').val() == '' 
   || $('#year').val() == '' || $('#length').val() == '' || $('#genre').val() == ''){
    alert("Dane niekompletne");
  } else if (genreExist($('#genre').val()) == -1){
    alert("Gatunek niepoprawny");
  }
  else {

    film.id = parseInt(document.getElementById("id").value);
    film.description = document.getElementById("desc").value;
    film.title = document.getElementById("title").value;
    film.production_year = parseFloat(document.getElementById("year").value);
    film.length = document.getElementById("length").value;
    film.genre_id = document.getElementById("genre").value;
    http.send(JSON.stringify(film));
  }
}

// GET
function getAll() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      document.getElementById("resultAll").innerHTML = "Result: <br>" + this.responseText;
	updateTable();
  };
  http.open("GET", "/cinema/rest/film/get", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}

// FIND BY ID
function findById() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      document.getElementById("resultFindById").innerHTML = "Result: <br>" + this.responseText;
    else
      document.getElementById("resultFindById").innerHTML = "Invalid request. No such object in database";
	updateTable();
  };
  http.open("GET", "/cinema/rest/film/find/" + document.getElementById('id2').value, true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}

// DELETE BY ID
function deleteById() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      document.getElementById("resultDeleteById").innerHTML = "Result: <br>" + this.responseText;
	updateTable();
  };
  http.open("GET", "/cinema/rest/film/delete/" + filmId(document.getElementById('delete').value), true);
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
            "<td><b>Tytul</b></td>"+
            "<td><b>Opis</b></td>"+
            "<td><b>Rok produkcji</b></td>"+
            "<td><b>Dlugosc</b></td>"+
            "<td><b>Gatunek</b></td>"+
            "</tr>";
      for(var i=0;i<films.length;i++){
          rows += "<tr><td>"+films[i]["title"]+"</td><td>"+films[i]["description"]+"</td><td>"+films[i]["production_year"]+"</td><td>"+films[i]["length"]+"</td><td>"+genreName(films[i]["genre_id"])+"</td></tr>";
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

function genreExist(genreName) {
  var id = -1;
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          var films = JSON.parse(this.response)["films"];
          for(var i=0;i<films.length;i++){
          if (films[i]["title"] == genreName)
            id = films[i]["id"]
          }
    };
  }  
  http.open("GET", "/cinema/rest/genre/find/" + id, false);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
  return id;
  
}


function filmId(title) {
  var id = 0;
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          var films = JSON.parse(this.response)["films"];
          for(var i=0;i<films.length;i++){
          if (films[i]["title"] == title)
            id = films[i]["id"]
          }
      }
  };
  http.open("GET", "/cinema/rest/film/get", false);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
  return id;
}