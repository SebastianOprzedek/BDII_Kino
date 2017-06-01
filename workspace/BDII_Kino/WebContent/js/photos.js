document.addEventListener("DOMContentLoaded", function(event) {
  updateTable();
  document.getElementById("image").style.display = "none";
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('#image')
                .attr('src', e.target.result)
                .width(150)
                .height(200);
  			document.getElementById("image").style.display = "block";
        };

        reader.readAsDataURL(input.files[0]);
    }
}

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

  if ($('#idc').val() == '' || $('#photo').val() == '' || $('#filmid').val() == '' ){
    alert("Dane niekompletne");
  } else if(!filmExist($('#idc').val())){
    alert("Film nie istnieje");
  }
  else {
    photo.idc = parseInt(document.getElementById("idc").value);
    photo.photo = document.getElementById("photo").value;
    photo.film_id = document.getElementById("filmid").value;
    http.send(JSON.stringify(photo));
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

//CHECKING IF FILM EXISTS
function filmExist(id) {
  var filmExists = false;
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          var films = JSON.parse(this.response)["films"];
          for(var i=0;i<films.length;i++){
          if (films[i]["id"] == id)
            return true;
          }
      }
  };
  http.open("GET", "/cinema/rest/film/get", false);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
  return false;
}

// TABELA NA G�RZE
function updateTable() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
    console.log(this.response);
    var image = "data:image/png;base64," + this.response;
 	document.getElementById("image").style.display = "block";
    document.getElementById("image").setAttribute( "src", image);
//      var photo = JSON.parse(this.response)["photo"];
//      var rows = "";
//      for(var i=0;i<photo.length;i++){
 //         rows += "<tr><td>"+photo[i]["idc"]+"</td><td>"+photo[i]["photo"]+"</td><td>"+photo[i]["film_id"]+"</td></tr>";
//        }
 //     document.getElementById("table").innerHTML = "<table border='2'>" + rows + "</table>";
     }
  };
  http.open("GET", "/cinema/rest/photo/get", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}