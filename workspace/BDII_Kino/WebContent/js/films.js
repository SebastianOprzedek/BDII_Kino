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

  film.id = parseInt(document.getElementById("id").value);
  film.description = document.getElementById("desc").value;
  film.title = document.getElementById("title").value;
  film.production_year = parseFloat(document.getElementById("year").value);
  film.length = document.getElementById("length").value;
  film.genre_id = document.getElementById("genre").value;
  http.send(JSON.stringify(film));
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
  http.open("GET", "/cinema/rest/film/delete/" + document.getElementById('delete').value, true);
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
            "<td>id</td>"+
            "<td>description</td>"+
            "<td>title</td>"+
            "<td>production_year</td>"+
            "<td>length</td>"+
            "<td>genre_id</td>"+
            "</tr>";
      for(var i=0;i<films.length;i++){
          rows += "<tr><td>"+films[i]["id"]+"</td><td>"+films[i]["description"]+"</td><td>"+films[i]["title"]+"</td><td>"+films[i]["production_year"]+"</td><td>"+films[i]["length"]+"</td><td>"+films[i]["genre_id"]+"</td></tr>";
        }
      document.getElementById("table").innerHTML = "<table border='2'>" + rows + "</table>";
     }
  };
  http.open("GET", "/cinema/rest/film/get", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}