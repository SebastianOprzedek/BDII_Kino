document.addEventListener("DOMContentLoaded", function(event) {
  updateTable();
});

// POST
function addTicketType() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      document.getElementById("resultPost").innerHTML =
      "Result: <br>" + this.responseText;
    else
      document.getElementById("resultPost").innerHTML = "Error";
	updateTable();
  };
  http.open("POST", "/cinema/updateTicketType", true);
  http.setRequestHeader("Content-Type", "application/json");
  var ticket = new Object();

  ticket.id = parseInt(document.getElementById("id").value);
  ticket.name = document.getElementById("name").value;
  ticket.pricelist_id = document.getElementById("pricelist").value;
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

// DELETE BY ID
function deleteById() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      document.getElementById("resultDeleteById").innerHTML = "Result: <br>" + this.responseText;
	updateTable();
  };
  http.open("GET", "/cinema/deleteTicketType/" + document.getElementById('delete').value, true);
  http.send();
}

// TABELA NA GÓRZE
function updateTable() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      var ticket = JSON.parse(this.response)["ticket"];
      var rows = "";
      for(var i=0;i<ticket.length;i++){
          rows += "<tr><td>"+ticket[i]["id"]+"</td><td>"+ticket[i]["name"]+"</td><td>"+ticket[i]["pricelist_id"]+"</td></tr>;
        }
      document.getElementById("table").innerHTML = "<table border='2'>" + rows + "</table>";
     }
  };
  http.open("GET", "/cinema/rest/ticket_type/get", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}