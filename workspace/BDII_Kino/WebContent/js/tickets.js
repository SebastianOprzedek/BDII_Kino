var ticketId;

document.addEventListener("DOMContentLoaded", function(event) {
  updateTable();
  document.getElementById("addTicket").style.display = "none";
  document.getElementById("updateTicket").style.display = "none";
});

// POST
function addTicket() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
	updateTable();
  };
  http.open("PUT", "/cinema/rest/ticket/create/ " + ticketId, true);
  http.setRequestHeader("Content-Type", "application/json");
  var ticket = new Object();

  if ($('#addTicketName').val() == '' || $('#addPriceFromList').val() == ''){
    alert("Dane niekompletne");
  } else if (genreId($('#addPriceFromList').val()) == -1){
    alert("Cena niepoprawna");

  }
  else{
    ticket.name = document.getElementById("addTicketName").value;
    ticket.pricelist_id = document.getElementById("addPriceFromList").value;
    http.send(JSON.stringify(ticket));
  }
  document.getElementById("addTicket").style.display = "none";
}

// GET
function getAll() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      document.getElementById("resultAll").innerHTML = "Result: <br>" + this.responseText;
	updateTable();
  };
  http.open("GET", "/cinema/getTicketType", true);
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
  http.open("GET", "/cinema/findTicketType/" + document.getElementById('id2').value, true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}

function showAddFilm(){
  		document.getElementById("addTicket").style.display = "block";
  		//document.getElementById("updateFilm").style.display = "none";
 		document.getElementById("addTicketName").value = "";
}
// DELETE BY ID
function deleteById() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      document.getElementById("resultDeleteById").innerHTML = "Result: <br>" + this.responseText;
	updateTable();
  };
  http.open("DELETE", "/cinema/deleteTicketType/" + document.getElementById('delete').value, true);
  http.send();
}

// TABELA NA G�RZE
function updateTable() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
    console.log(this);
      var ticket = JSON.parse(this.response)["ticket_types"];
      var rows = "";
      for(var i=0;i<ticket.length;i++){
          rows += "<tr><td>"+ticket[i]["id"]+"</td><td>"+ticket[i]["name"]+"</td><td>"+ticket[i]["pricelist_id"]+"</td></tr>";
          }
      document.getElementById("table").innerHTML = "<table border='2'>" + rows + "</table>";
     }
  };
  http.open("GET", "/cinema/rest/ticket_type/get", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}
