var hallId;

document.addEventListener("DOMContentLoaded", function(event) {
  updateTable();
  document.getElementById("addHall").style.display = "none";
  document.getElementById("updateHall").style.display = "none";
});

function addHall() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
		updateTable();
  };
  http.open("POST", "/cinema/rest/hall", true);
  http.setRequestHeader("Content-Type", "application/json");
  var hall = new Object();

  if ($('#addHallName').val() == '' ){
    alert("Dane niekompletne");
  } else
  {
    hall.name = $('#addHallName').val();
    hall.size = $('#addHallSize').val();
    http.send(JSON.stringify(hall));
  }
  document.getElementById("addHall").style.display = "none";
}

function updateHall(id) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
		updateTable();
  };
  http.open("PUT", "/cinema/rest/hall/"+id, true);
  http.setRequestHeader("Content-Type", "application/json");
  var hall = new Object();

  if ($('#updateHallName').val() == '' ){
    alert("Dane niekompletne");
  } else
  {
    hall.id = id;
    hall.name = $('#updateHallName').val();
    hall.size = $('#updateHallSize').val();
    http.send(JSON.stringify(hall));
  }
  document.getElementById("updateHall").style.display = "none";
}

function update(id){
  document.getElementById("addHall").style.display = "none";
	hallId = id;
	var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
    {
  		document.getElementById("updateHall").style.display = "block";
   		var hall = JSON.parse(this.response);
   		document.getElementById("updateHallName").value = hall.name;
   		document.getElementById("updateHallSize").value = hall.size;
    }
  };
  http.open("GET", "/cinema/rest/hall/" + id, true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}

function showAddHall(){
  	document.getElementById("addHall").style.display = "block";
  	document.getElementById("updateHall").style.display = "none";
 		document.getElementById("addHallName").value = "";
 		document.getElementById("addHallSize").value = 20;
}

function updateTable() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      console.log(this.response);
      var halls = JSON.parse(this.response)["halls"];
      var rows = "";
      rows += "<tr>"+
            "<td><b>Nazwa</b></td>"+
            "<td><b>Ilość miejsc</b></td>"+
            "<td><a href=\"javascript:showAddHall();\"><i class=\"fa fa-plus icons-margin\"></i></a></td>"+
            "</tr>";
      for(var i=0;i<halls.length;i++){
      	  var hall = new Object();
      	  hall = halls[i];
          rows += "<tr><td>"+halls[i]["name"]+"</td><td>"+halls[i]["size"]+"</td><td><a href=\"javascript:update("+halls[i]["id"]+")\"><i class=\"fa fa-pencil icons-margin\"></i></a><a href=\"javascript:deleteById(" + halls[i]["id"] + ");\"><i class=\"fa fa-trash icons-margin\"></i></a><a href=\"javascript:showPlaces(" + halls[i]["id"] + ");\"><i class=\"fa fa-th icons-margin\"></i></a></td></tr>";
        }
      document.getElementById("table").innerHTML = "<table class=\"table table-condensed\" width=\"100%\">" + rows + "</table>";
     }
  };
  http.open("GET", "/cinema/rest/hall", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}

function deleteById(id) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
      if (this.readyState == 4 )
		updateTable();
  };
  http.open("DELETE", "/cinema/rest/hall/" + id, true);
  http.send();
}
