document.addEventListener("DOMContentLoaded", function(event) {
  updateTable();
});

// POST
function addGenre() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      document.getElementById("resultPost").innerHTML =
      "Result: <br>" + this.responseText;
    else
      document.getElementById("resultPost").innerHTML = "Error";
	updateTable();
  };
  http.open("POST", "/cinema/rest/genre/update", true);
  http.setRequestHeader("Content-Type", "application/json");
  var genre = new Object();

  genre.id = parseInt(document.getElementById("id").value);
  genre.description = document.getElementById("desc").value;
  genre.name = document.getElementById("name").value;
  http.send(JSON.stringify(genre));
}

// GET
function getAll() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      document.getElementById("resultAll").innerHTML = "Result: <br>" + this.responseText;
	updateTable();
  };
  http.open("GET", "/cinema/rest/genre/get", true);
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
  http.open("GET", "/cinema/rest/genre/find/" + document.getElementById('id2').value, true);
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
  http.open("GET", "/cinema/rest/genre/delete/" + document.getElementById('delete').value, true);
  http.send();
}

// TABELA NA GÓRZE
function updateTable() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      var genres = JSON.parse(this.response)["genres"];
      var rows = "";
      rows += "<tr>"+
            "<td><b>Nazwa</b></td>"+
            "<td><b>Opis</b></td>"+
            "</tr>";
      for(var i=0;i<genres.length;i++){
          rows += "<tr><td>"+genres[i]["name"]+"</td><td>"+genres[i]["description"]+"</td></tr>";
        }
      document.getElementById("table").innerHTML = "<table class=\"table table-condensed\" width=\"100%\">" + rows + "</table>";
     }
  };
  http.open("GET", "/cinema/rest/genre/get", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}

function deleteById() {
console.log(document.getElementById('delete').value);
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      document.getElementById("resultDeleteById").innerHTML = "Result: <br>" + this.responseText;
	updateTable();
  };
  http.open("GET", "/cinema/rest/genre/delete/" + genreId(document.getElementById('delete').value), true);
  http.send();
}

function genreId(name) {
  var id = 0;
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          var genres = JSON.parse(this.response)["genres"];
          for(var i=0;i<genres.length;i++){
          if (genres[i]["name"] == name)
            id = genres[i]["id"]
          }
      }
  };
  http.open("GET", "/cinema/rest/genre/get", false);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
  return id;
}