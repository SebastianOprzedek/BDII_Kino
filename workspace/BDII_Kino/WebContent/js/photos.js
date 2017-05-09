document.addEventListener("DOMContentLoaded", function(event) {
  updateTable();
});

// POST
function addPhoto() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      document.getElementById("resultPost").innerHTML =
      "Result: <br>" + this.responseText;
    else
      document.getElementById("resultPost").innerHTML = "Error";
	updateTable();
  };
  http.open("POST", "/cinema/updatePhoto", true);
  http.setRequestHeader("Content-Type", "application/json");
  var photo = new Object();

  photo.idc = parseInt(document.getElementById("idc").value);
  photo.photo = document.getElementById("photo").value;
  photo.film_id = document.getElementById("filmid").value;
  http.send(JSON.stringify(photo));
}

// GET
function getAll() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      document.getElementById("resultAll").innerHTML = "Result: <br>" + this.responseText;
	updateTable();
  };
  http.open("GET", "/cinema/getPhoto", true);
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
  http.open("GET", "/cinema/findPhoto/" + document.getElementById('id2').value, true);
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
  http.open("GET", "/cinema/deletePhoto/" + document.getElementById('delete').value, true);
  http.send();
}

// TABELA NA GÓRZE
function updateTable() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      var photo = JSON.parse(this.response)["photo"];
      var rows = "";
      for(var i=0;i<photo.length;i++){
          rows += "<tr><td>"+photo[i]["idc"]+"</td><td>"+photo[i]["photo"]+"</td><td>"+photo[i]["film_id"]+"</td></tr>";
        }
      document.getElementById("table").innerHTML = "<table border='2'>" + rows + "</table>";
     }
  };
  http.open("GET", "/cinema/rest/photo/get", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}