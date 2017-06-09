var priceId;

document.addEventListener("DOMContentLoaded", function(event) {
  updateTable();
  document.getElementById("addPrice").style.display = "none";
  document.getElementById("updatePrice").style.display = "none";
});

function addPrice() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    updateTable();
  };
  http.open("POST", "/cinema/rest/price", true);
  http.setRequestHeader("Content-Type", "application/json");
  var price = new Object();

   if ($('#addPriceId').val() == '' || $('#addPricePrice').val() == '' || $('#addPriceStartDay').val() == '' || $('#addPriceStartYear').val() == '' || $('#addPriceEndDay').val() == '' || $('#addPriceEndMonth').val() == '' ){
    alert("Dane niekompletne");
  } //Lata przestepne
    else if(($('#addPriceStartMonth').val() == '1' && $('#addPriceStartYear').val() == '2020' && $('#addPriceStartDay').val() > 29) || ($('#addPriceEndMonth').val() == 1 && $('#addPrcieEndYear').val() == 2020 && $('#addPriceEndDay').val() > 29)){
       alert("Maksymalnie 29 dni");
   } //Luty
   else if(($('#addPriceStartMonth').val() == '1' && $('#addPriceStartDay').val() > 28) || ($('#addPriceEndMonth').val() == '1' && $('#addPriceEndDay').val() > 28)){
       alert("Maksymalnie 28 dni");
   } //Reszta 30 dniowych miesiecy
   else if(($('#addPriceStartMonth').val()%2 == '1'  && $('#addPriceStartMonth').val() != '7' && $('#addPriceStartDay').val() > 30) || ($('#addPriceEndMonth').val()%2 == '1' && $('#addPriceEndMonth').val() != '7' && $('#addPriceEndDay').val() > 30)){
       alert("Maksymalnie 30 dni");
   }
   else {
    price.price = document.getElementById("addPricePrice").value;
    price.start_date = new Date(document.getElementById("addPriceStartYear").value, document.getElementById("addPriceStartMonth").value, document.getElementById("addPriceStartDay").value, 0,0,0);
    price.end_date = new Date(document.getElementById("addPriceEndYear").value, document.getElementById("addPriceEndMonth").value, document.getElementById("addPriceEndDay").value, 0,0,0);

    http.send(JSON.stringify(price));
  }
  document.getElementById("addPrice").style.display = "none";
}

function updatePrice() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    updateTable();
  };
  http.open("PUT", "/cinema/rest/price/"+priceId, true);
  http.setRequestHeader("Content-Type", "application/json");
  var price = new Object();

   if ($('#updatePriceId').val() == '' || $('#updatePricePrice').val() == '' || $('#updatePriceStartDay').val() == '' || $('#updatePriceStartYear').val() == '' || $('#updatePriceEndDay').val() == '' || $('#updatePriceEndMonth').val() == '' ){
    alert("Dane niekompletne");
  } //Lata przestepne
    else if(($('#updatePriceStartMonth').val() == '1' && $('#updatePriceStartYear').val() == '2020' && $('#updatePriceStartDay').val() > 29) || ($('#updatePriceEndMonth').val() == 1 && $('#updatePriceEndYear').val() == 2020 && $('#updatePriceEndDay').val() > 29)){
       alert("Maksymalnie 29 dni");
   } //Luty
   else if(($('#updatePriceStartMonth').val() == '1' && $('#updatePriceStartDay').val() > 28) || ($('#updatePriceEndMonth').val() == '1' && $('#updatePriceEndDay').val() > 28)){
       alert("Maksymalnie 28 dni");
   } //Reszta 30 dniowych miesiecy
   else if(($('#updatePriceStartMonth').val()%2 == '1'  && $('#updatePriceStartMonth').val() != '7' && $('#updatePriceStartDay').val() > 30) || ($('#updatePriceEndMonth').val()%2 == '1' && $('#updatePriceEndMonth').val() != '7' && $('#updatePriceEndDay').val() > 30)){
       alert("Maksymalnie 30 dni");
   }
   else {
    price.id = priceId;
    price.price = document.getElementById("updatePricePrice").value;
    price.start_date = new Date(document.getElementById("updatePriceStartYear").value, document.getElementById("updatePriceStartMonth").value, document.getElementById("updatePriceStartDay").value, 0,0,0);
    price.end_date = new Date(document.getElementById("updatePriceEndYear").value, document.getElementById("updatePriceEndMonth").value, document.getElementById("updatePriceEndDay").value, 0,0,0);
    http.send(JSON.stringify(price));
  }
  document.getElementById("updatePrice").style.display = "none";
}

function update(id){
  document.getElementById("addPrice").style.display = "none";
	priceId = id;
	var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200)
    {
  		document.getElementById("updatePrice").style.display = "block";
   		var price = JSON.parse(this.response);
      start_date = new Date(price.start_date);
      end_date = new Date(price.end_date);
      var start_month = start_date.getUTCMonth()
      var start_day = start_date.getUTCDate();
      var start_year = start_date.getUTCFullYear();
      var end_month = end_date.getUTCMonth()
      var end_day = end_date.getUTCDate();
      var end_year = end_date.getUTCFullYear();
      document.getElementById("updatePricePrice").value = price.price;
      document.getElementById("updatePriceStartDay").value = start_day;
      document.getElementById("updatePriceEndDay").value = end_day;
      document.getElementById("updatePriceStartYear").value = start_year;
      document.getElementById("updatePriceEndYear").value = end_year;
      $('#updatePriceStartMonth').prop('selectedIndex', start_month);
      $('#updatePriceEndMonth').prop('selectedIndex', end_month);
    }
  };
  http.open("GET", "/cinema/rest/price/" + id, true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}


function showAddGenre(){
  	document.getElementById("addPrice").style.display = "block";
  	document.getElementById("updatePrice").style.display = "none";
 		document.getElementById("addPricePrice").value = "";
 		document.getElementById("addPriceStartDay").value = 0;
 		document.getElementById("addPriceEndDay").value = 0;
 		document.getElementById("addPriceStartYear").value = 0;
 		document.getElementById("addPriceEndYear").value = 0;
    $('#addPriceStartMonth').prop('selectedIndex',0);
    $('#addPriceEndMonth').prop('selectedIndex',0);
}



function deleteById(id) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
	   updateTable();
  };
  http.open("DELETE", "/cinema/rest/price/" + id, true);
  http.send();
}

function updateTable() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      var price = JSON.parse(this.response)["prices"];
      var rows = "";
      rows += "<tr>"+
            "<td><b>Cena</b></td>"+
            "<td><b>Od</b></td>"+
            "<td><b>Do</b></td>"+
            "<td><a href=\"javascript:showAddGenre();\"><i class=\"fa fa-plus icons-margin\"></i></a></td>"+
            "</tr>";
      for(var i=0;i<price.length;i++){
          rows += "<tr><td>"+price[i]["price"]+"</td><td>"+price[i]["start_date"]+"</td><td>"+price[i]["end_date"]+"</td><td><a href=\"javascript:update("+price[i]["id"]+")\"><i class=\"fa fa-pencil icons-margin\"></i></a><a href=\"javascript:deleteById(" + price[i]["id"] + ");\"><i class=\"fa fa-trash icons-margin\"></i></a></td></tr>";
        }
      document.getElementById("table").innerHTML = "<table class=\"table table-condensed\" width=\"100%\">" + rows + "</table>";
     }
  };
  http.open("GET", "/cinema/rest/price", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}
