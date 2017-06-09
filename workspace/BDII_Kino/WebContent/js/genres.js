var genreId;

document.addEventListener("DOMContentLoaded", function(event) {
  updateTable();
  document.getElementById("addGenre").style.display = "none";
  document.getElementById("updateGenre").style.display = "none";
});

function addGenre() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
		updateTable();
  };
  http.open("POST", "/cinema/rest/genre", true);
  http.setRequestHeader("Content-Type", "application/json");
  var genre = new Object();

  if ($('#addGenreDesc').val() == '' || $('#addGenreName').val() == '' ){
    alert("Dane niekompletne");
  } else
  {
    genre.description = $('#addGenreDesc').val();
    genre.name = $('#addGenreName').val();
    http.send(JSON.stringify(genre));
  }
  document.getElementById("addGenre").style.display = "none";
}

function updateGenre(id) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
		updateTable();
  };
  http.open("PUT", "/cinema/rest/genre/"+id, true);
  http.setRequestHeader("Content-Type", "application/json");
  var genre = new Object();

  if ($('#updateGenreDesc').val() == '' || $('#updateGenreName').val() == '' ){
    alert("Dane niekompletne");
  } else
  {
    genre.id = id;
    genre.description = $('#updateGenreDesc').val();
    genre.name = $('#updateGenreName').val();
    http.send(JSON.stringify(genre));
  }
  document.getElementById("updateGenre").style.display = "none";
}

function update(id){
  		document.getElementById("addGenre").style.display = "none";
	genreId = id;
	var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
    {
  		document.getElementById("updateGenre").style.display = "block";
 		var genre = JSON.parse(this.response);
 		document.getElementById("updateGenreName").value = genre.name;
 		document.getElementById("updateGenreDesc").value = genre.description;
    }
  };
  http.open("GET", "/cinema/rest/genre/" + id, true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}

function showAddGenre(){
  	document.getElementById("addGenre").style.display = "block";
  	document.getElementById("updateGenre").style.display = "none";
 		document.getElementById("addGenreName").value = "";
 		document.getElementById("addGenreDesc").value = "";
}

function updateTable() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      var genres = JSON.parse(this.response)["genres"];
      var rows = "";
      rows += "<tr>"+
            "<td><b>Nazwa</b></td>"+
            "<td><b>Opis</b></td>"+
            "<td><a href=\"javascript:showAddGenre();\"><i class=\"fa fa-plus icons-margin\"></i></a></td>"+
            "</tr>";
      for(var i=0;i<genres.length;i++){
      	  var genre = new Object();
      	  genre = genres[i];
          rows += "<tr><td>"+genres[i]["name"]+"</td><td>"+genres[i]["description"]+"</td><td><a href=\"javascript:update("+genres[i]["id"]+")\"><i class=\"fa fa-pencil icons-margin\"></i></a><a href=\"javascript:deleteById(" + genres[i]["id"] + ");\"><i class=\"fa fa-trash icons-margin\"></i></a></td></tr>";
        }
      document.getElementById("table").innerHTML = "<table class=\"table table-condensed\" width=\"100%\">" + rows + "</table>";
     }
  };
  http.open("GET", "/cinema/rest/genre", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}

function deleteById(id) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
      if (this.readyState == 4 )
		updateTable();
  };
  http.open("DELETE", "/cinema/rest/genre/" + id, true);
  http.send();
}
