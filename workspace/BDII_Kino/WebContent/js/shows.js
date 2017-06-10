var showId;

document.addEventListener("DOMContentLoaded", function(event) {
  updateTable();
  document.getElementById("addShow").style.display = "none";
  document.getElementById("updateShow").style.display = "none";
});

function addShow() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
		updateTable();
  };
  http.open("POST", "/cinema/rest/show", true);
  http.setRequestHeader("Content-Type", "application/json");
  var show = new Object();

  if ($('#addShowName').val() == '' || $('#addFilmName').val() == '' || $('#addYear').val() == '' || $('#addMonth').val() == '' || $('#addDay').val() == '' || $('#addHour').val() == '' ||  $('#addMinute').val() == ''){
    alert("Dane niekompletne");
  } else
  {
    show.data = new Date(document.getElementById("addYear").value, document.getElementById("addMonth").value, document.getElementById("addDay").value, document.getElementById("addHour").value,document.getElementById("addMinute").value,0);
    show.sala_id = $('#addHallName').val();
    show.film_id = $('#addFilmName').val();

    http.send(JSON.stringify(show));
  }
  document.getElementById("addShow").style.display = "none";
}

function updateShow(id) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
		updateTable();
  };
  http.open("PUT", "/cinema/rest/show/"+id, true);
  http.setRequestHeader("Content-Type", "application/json");
  var show = new Object();

    if ($('#updateShowName').val() == '' || $('#updateFilmName').val() == '' || $('#updateYear').val() == '' || $('#updateMonth').val() == '' || $('#updateDay').val() == '' || $('#updateHour').val() == '' ||  $('#updateMinute').val() == ''){
    alert("Dane niekompletne");
  } else
  {
    show.id = id;
    show.data = new Date(document.getElementById("updateYear").value, document.getElementById("updateMonth").value, document.getElementById("updateDay").value, document.getElementById("updateHour").value,document.getElementById("updateMinute").value,0);
    show.sala_id = $('#updateHallName').val();
    show.film_id = $('#updateFilmName').val();
    http.send(JSON.stringify(show));
  }
  document.getElementById("updateHall").style.display = "none";
}

function update(id){
  document.getElementById("addHall").style.display = "none";
	showId = id;
	var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
    {
  		document.getElementById("updateHall").style.display = "block";
   		var show = JSON.parse(this.response);
        document.getElementById("updateHallName").value = show.sala_id;
        document.getElementById("updateShowName").value = show.film_id;

    }
  };
  http.open("GET", "/cinema/rest/show/" + id, true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}

function showAddShow(){
  	document.getElementById("addShow").style.display = "block";
  	document.getElementById("updateShow").style.display = "none";
    document.getElementById("addShowName").value = "";
  	document.getElementById("addHallName").value = "";
}

function updateTable() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      var shows = JSON.parse(this.response)["shows"];
      var rows = "";
      rows += "<tr>"+
            "<td><b>Data</b></td>"+
            "<td><b>Film</b></td>"+
            "<td><b>Sala</b></td>"+
            "<td><a href=\"javascript:showAddShow();\"><i class=\"fa fa-plus icons-margin\"></i></a></td>"+
            "</tr>";
      for(var i=0;i<shows.length;i++){
      	  var show = new Object();
      	  show = shows[i];
          rows += "<tr><td>"+shows[i]["data"]+"</td><td>"+shows[i]["film_id"]+"</td><td>"+shows[i]["sala_id"]+"</td><td><a href=\"javascript:update("+shows[i]["id"]+")\"><i class=\"fa fa-pencil icons-margin\"></i></a><a href=\"javascript:deleteById(" + shows[i]["id"] + ");\"><i class=\"fa fa-trash icons-margin\"></i></a></td></tr>";
        }
      document.getElementById("table").innerHTML = "<table class=\"table table-condensed\" width=\"100%\">" + rows + "</table>";
     }
  };
  http.open("GET", "/cinema/rest/show", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}

function deleteById(id) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
      if (this.readyState == 4 )
		updateTable();
  };
  http.open("DELETE", "/cinema/rest/show/" + id, true);
  http.send();
}
