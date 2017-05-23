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


   if ($('#id').val() == '' || $('#price').val() == '' || $('#start_day').val() == '' || $('#start_year').val() == '' || $('#end_day').val() == '' || $('#end_month').val() == '' ){
    alert("Dane niekompletne");
  } //Lata przestepne
    else if(($('#start_month').val() == '1' && $('#start_year').val() == '2020' && $('#start_day').val() > 29) || ($('#end_month').val() == 1 && $('#end_year').val() == 2020 && $('#end_day').val() > 29)){
       alert("Maksymalnie 29 dni");
   } //Luty
   else if(($('#start_month').val() == '1' && $('#start_day').val() > 28) || ($('#end_month').val() == '1' && $('#end_day').val() > 28)){
       alert("Maksymalnie 28 dni");
   } //Reszta 30 dniowych miesiecy
   else if(($('#start_month').val()%2 == '1'  && $('#start_month').val() != '7' && $('#start_day').val() > 30) || ($('#end_month').val()%2 == '1' && $('#end_month').val() != '7' && $('#end_day').val() > 30)){
       alert("Maksymalnie 30 dni");
   }
   else {

    price.id = parseInt(document.getElementById("id").value);
    console.log(document);
    price.price = document.getElementById("price").value;
    price.start_date = new Date(document.getElementById("start_year").value, document.getElementById("start_month").value, document.getElementById("start_day").value, 0,0,0);
    price.end_date = new Date(document.getElementById("end_year").value, document.getElementById("end_month").value, document.getElementById("end_day").value, 0,0,0);
    
    http.send(JSON.stringify(price));
    console.log(price);
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

// TABELA NA G�RZE
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