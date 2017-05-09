document.addEventListener("DOMContentLoaded", function(event) {
  updateTable();
});

// POST
function addPrice() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      document.getElementById("resultPost").innerHTML =
      "Result: <br>" + this.responseText;
    else
      document.getElementById("resultPost").innerHTML = "Error";
	updateTable();
  };
  http.open("POST", "/cinema/rest/price/update", true);
  http.setRequestHeader("Content-Type", "application/json");
  var price = new Object();

  price.id = parseInt(document.getElementById("id").value);
  console.log(document);
  price.price = document.getElementById("price").value;
  price.start_date = document.getElementById("start").value;
  price.end_date = document.getElementById("end").value;
  
  http.send(JSON.stringify(price));
  console.log(price);
}

// GET
function getAll() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
      document.getElementById("resultAll").innerHTML = "Result: <br>" + this.responseText;
	updateTable();
  };
  http.open("GET", "/cinema/rest/price/get", true);
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
  http.open("GET", "/cinema/rest/price/find/" + document.getElementById('id2').value, true);
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
  http.open("GET", "/cinema/rest/price/delete/" + document.getElementById('delete').value, true);
  http.send();
}

// TABELA NA GÓRZE
function updateTable() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      var price = JSON.parse(this.response)["prices"];
      var rows = "";
      for(var i=0;i<price.length;i++){
          rows += "<tr><td>"+price[i]["id"]+"</td><td>"+price[i]["price"]+"</td><td>"+price[i]["start_date"]+"</td><td>"+price[i]["end_date"]+"</td></tr>";
        }
      document.getElementById("table").innerHTML = "<table border='2'>" + rows + "</table>";
     }
  };
  http.open("GET", "/cinema/rest/price/get", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}