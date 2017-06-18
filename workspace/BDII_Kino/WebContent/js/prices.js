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
  var correctFormat = true;
	
	//kompletnosc danych
    if($('#addPriceId').val() == '' || $('#addPricePrice').val() == '' || $('#addPriceStartDay').val() == '' || $('#addPriceStartYear').val() == '' || $('#addPriceEndDay').val() == '' || $('#addPriceEndMonth').val() == '' ){
		alert("Dane niekompletne");
		correctFormat = false;
    }
	
	//sprawdzenie ilosci dni lutego dla daty startu
	//czy wybrano luty
	if($('#addPriceStartMonth').val() == '1'){
		//czy rok jest przestepny
		if((($('#addPriceStartYear').val() % 4 == 0) && ($('#addPriceStartYear').val() % 100 != 0)) || ($('#addPriceStartYear').val() % 400 == 0)){
			//czy dzien jest wiekszy niz 29
			if($('#addPriceStartDay').val() > 29){
				alert("Luty w latach przestepnych ma maksymalnie 29 dni");
				correctFormat = false;
			}
		}
		else if($('#addPriceStartDay').val() > 28){
			alert("Luty w latach nieprzestepnych ma maksymalnie 28 dni");
			correctFormat = false;
		}
	}
	
	//sprawdzenie ilosci dni lutego dla daty konca
	//czy wybrano luty
	if($('#addPriceEndMonth').val() == '1'){
		//czy rok jest przestepny
		if((($('#addPriceEndYear').val() % 4 == 0) && ($('#addPriceEndYear').val() % 100 != 0)) || ($('#addPriceEndYear').val() % 400 == 0)){
			//czy dzien jest wiekszy niz 29
			if($('#addPriceEndDay').val() > 29){
				alert("Luty w latach przestepnych ma maksymalnie 29 dni");
				correctFormat = false;
			}
		}
		else if($('#addPriceEndDay').val() > 28){
			alert("Luty w latach nieprzestepnych ma maksymalnie 28 dni");
			correctFormat = false;
		}
	}
	
	//sprawdzenie ilosci dni styczen-lipiec dla daty poczatku
	//czy wybrano styczen-lipiec
	if(($('#addPriceStartMonth').val() >= 0) && ($('#addPriceStartMonth').val() <= 6)){
		//czy wybrano kwiecien/czerwiec
		if(($('#addPriceStartMonth').val() % 2 == 1) && ($('#addPriceStartMonth').val() != 1)){
			//czy dzien jest wiekszy niz 30
			if($('#addPriceStartDay').val() > 30){
				alert("Wybrany miesiac daty startowej ma maksymalnie 30 dni");
				correctFormat = false;
			}
		}
		//jezeli tu wejdzie wybrano styczen/marzec/maj/lipiec
		else{
			//czy dzien jest wiekszy niz 31
			if($('#addPriceStartDay').val() > 31){
				if(correctFormat){
					alert("Wybrany miesiac daty startowej ma maksymalnie 31 dni");
				}				
				correctFormat = false;
			}
		}
	}
	
	//sprawdzenie ilosci dni styczen-lipiec dla daty konca
	//czy wybrano styczen-lipiec
	if(($('#addPriceEndMonth').val() >= 0) && ($('#addPriceEndMonth').val() <= 6)){
		//czy wybrano kwiecien/czerwiec
		if(($('#addPriceEndMonth').val() % 2 == 1) && ($('#addPriceEndMonth').val() != 1)){
			//czy dzien jest wiekszy niz 30
			if($('#addPriceEndDay').val() > 30){
				alert("Wybrany miesiac daty startowej ma maksymalnie 30 dni");
				correctFormat = false;
			}
		}
		//jezeli tu wejdzie wybrano styczen/marzec/maj/lipiec
		else{
			//czy dzien jest wiekszy niz 31
			if($('#addPriceEndDay').val() > 31){
				if(correctFormat){
					alert("Wybrany miesiac daty startowej ma maksymalnie 31 dni");
				}				
				correctFormat = false;
			}
		}
	}
	
	//sprawdzenie ilosci dni sierpien-grudzien dla daty poczatku
	//czy wybrano sierpien-grudzien
	if(($('#addPriceStartMonth').val() >= 7) && ($('#addPriceStartMonth').val() <= 11)){
		//czy wybrano wrzesien/listopad
		if(($('#addPriceStartMonth').val() % 2 == 0)){
			//czy dzien jest wiekszy niz 30
			if($('#addPriceStartDay').val() > 30){
				alert("Wybrany miesiac daty startowej ma maksymalnie 30 dni");
				correctFormat = false;
			}
		}
		//jezeli tu wejdzie wybrano sierpien/pazdziernik/grudzien
		else{
			//czy dzien jest wiekszy niz 31
			if($('#addPriceStartDay').val() > 31){
				alert("Wybrany miesiac daty startowej ma maksymalnie 31 dni");				
				correctFormat = false;
			}
		}
	}
	
	//sprawdzenie ilosci dni sierpien-grudzien dla daty konca
	//czy wybrano sierpien-grudzien
	if(($('#addPriceEndMonth').val() >= 7) && ($('#addPriceEndMonth').val() <= 11)){
		//czy wybrano wrzesien/listopad
		if(($('#addPriceEndMonth').val() % 2 == 0)){
			//czy dzien jest wiekszy niz 30
			if($('#addPriceEndDay').val() > 30){
				alert("Wybrany miesiac daty startowej ma maksymalnie 30 dni");
				correctFormat = false;
			}
		}
		//jezeli tu wejdzie wybrano sierpien/pazdziernik/grudzien
		else{
			//czy dzien jest wiekszy niz 31
			if($('#addPriceEndDay').val() > 31){
				alert("Wybrany miesiac daty startowej ma maksymalnie 31 dni");			
				correctFormat = false;
			}
		}
	}
	
  if(correctFormat){
	  price.price = document.getElementById("addPricePrice").value;
      price.start_date = new Date(document.getElementById("addPriceStartYear").value, document.getElementById("addPriceStartMonth").value, document.getElementById("addPriceStartDay").value, 0,0,0);
      price.end_date = new Date(document.getElementById("addPriceEndYear").value, document.getElementById("addPriceEndMonth").value, document.getElementById("addPriceEndDay").value, 0,0,0);
      alert("Dodano cene");
      http.send(JSON.stringify(price));
  }	
}

function updatePrice() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    updateTable();
  };
  http.open("PUT", "/cinema/rest/price/"+priceId, true);
  http.setRequestHeader("Content-Type", "application/json");
  var price = new Object();
  var correctFormat = true;
  
  	//kompletnosc danych
    if($('#updatePriceId').val() == '' || $('#updatePricePrice').val() == '' || $('#updatePriceStartDay').val() == '' || $('#updatePriceStartYear').val() == '' || $('#updatePriceEndDay').val() == '' || $('#updatePriceEndMonth').val() == '' ){
		alert("Dane niekompletne");
		correctFormat = false;
    }
	
	//sprawdzenie ilosci dni lutego dla daty startu
	//czy wybrano luty
	if($('#updatePriceStartMonth').val() == '1'){
		//czy rok jest przestepny
		if((($('#updatePriceStartYear').val() % 4 == 0) && ($('#updatePriceStartYear').val() % 100 != 0)) || ($('#updatePriceStartYear').val() % 400 == 0)){
			//czy dzien jest wiekszy niz 29
			if($('#updatePriceStartDay').val() > 29){
				alert("Luty w latach przestepnych ma maksymalnie 29 dni");
				correctFormat = false;
			}
		}
		else if($('#updatePriceStartDay').val() > 28){
			alert("Luty w latach nieprzestepnych ma maksymalnie 28 dni");
			correctFormat = false;
		}
	}
	
	//sprawdzenie ilosci dni lutego dla daty konca
	//czy wybrano luty
	if($('#updatePriceEndMonth').val() == '1'){
		//czy rok jest przestepny
		if((($('#updatePriceEndYear').val() % 4 == 0) && ($('#updatePriceEndYear').val() % 100 != 0)) || ($('#updatePriceEndYear').val() % 400 == 0)){
			//czy dzien jest wiekszy niz 29
			if($('#updatePriceEndDay').val() > 29){
				alert("Luty w latach przestepnych ma maksymalnie 29 dni");
				correctFormat = false;
			}
		}
		else if($('#updatePriceEndDay').val() > 28){
			alert("Luty w latach nieprzestepnych ma maksymalnie 28 dni");
			correctFormat = false;
		}
	}
	
	//sprawdzenie ilosci dni styczen-lipiec dla daty poczatku
	//czy wybrano styczen-lipiec
	if(($('#updatePriceStartMonth').val() >= 0) && ($('#updatePriceStartMonth').val() <= 6)){
		//czy wybrano kwiecien/czerwiec
		if(($('#updatePriceStartMonth').val() % 2 == 1) && ($('#updatePriceStartMonth').val() != 1)){
			//czy dzien jest wiekszy niz 30
			if($('#updatePriceStartDay').val() > 30){
				alert("Wybrany miesiac daty startowej ma maksymalnie 30 dni");
				correctFormat = false;
			}
		}
		//jezeli tu wejdzie wybrano styczen/marzec/maj/lipiec
		else{
			//czy dzien jest wiekszy niz 31
			if($('#updatePriceStartDay').val() > 31){
				if(correctFormat){
					alert("Wybrany miesiac daty startowej ma maksymalnie 31 dni");
				}				
				correctFormat = false;
			}
		}
	}
	
	//sprawdzenie ilosci dni styczen-lipiec dla daty konca
	//czy wybrano styczen-lipiec
	if(($('#updatePriceEndMonth').val() >= 0) && ($('#updatePriceEndMonth').val() <= 6)){
		//czy wybrano kwiecien/czerwiec
		if(($('#updatePriceEndMonth').val() % 2 == 1) && ($('#updatePriceEndMonth').val() != 1)){
			//czy dzien jest wiekszy niz 30
			if($('#updatePriceEndDay').val() > 30){
				alert("Wybrany miesiac daty startowej ma maksymalnie 30 dni");
				correctFormat = false;
			}
		}
		//jezeli tu wejdzie wybrano styczen/marzec/maj/lipiec
		else{
			//czy dzien jest wiekszy niz 31
			if($('#updatePriceEndDay').val() > 31){
				if(correctFormat){
					alert("Wybrany miesiac daty startowej ma maksymalnie 31 dni");
				}				
				correctFormat = false;
			}
		}
	}
	
	//sprawdzenie ilosci dni sierpien-grudzien dla daty poczatku
	//czy wybrano sierpien-grudzien
	if(($('#updatePriceStartMonth').val() >= 7) && ($('#updatePriceStartMonth').val() <= 11)){
		//czy wybrano wrzesien/listopad
		if(($('#updatePriceStartMonth').val() % 2 == 0)){
			//czy dzien jest wiekszy niz 30
			if($('#updatePriceStartDay').val() > 30){
				alert("Wybrany miesiac daty startowej ma maksymalnie 30 dni");
				correctFormat = false;
			}
		}
		//jezeli tu wejdzie wybrano sierpien/pazdziernik/grudzien
		else{
			//czy dzien jest wiekszy niz 31
			if($('#updatePriceStartDay').val() > 31){
				alert("Wybrany miesiac daty startowej ma maksymalnie 31 dni");				
				correctFormat = false;
			}
		}
	}
	
	//sprawdzenie ilosci dni sierpien-grudzien dla daty konca
	//czy wybrano sierpien-grudzien
	if(($('#updatePriceEndMonth').val() >= 7) && ($('#updatePriceEndMonth').val() <= 11)){
		//czy wybrano wrzesien/listopad
		if(($('#updatePriceEndMonth').val() % 2 == 0)){
			//czy dzien jest wiekszy niz 30
			if($('#updatePriceEndDay').val() > 30){
				alert("Wybrany miesiac daty startowej ma maksymalnie 30 dni");
				correctFormat = false;
			}
		}
		//jezeli tu wejdzie wybrano sierpien/pazdziernik/grudzien
		else{
			//czy dzien jest wiekszy niz 31
			if($('#updatePriceEndDay').val() > 31){
				alert("Wybrany miesiac daty startowej ma maksymalnie 31 dni");			
				correctFormat = false;
			}
		}
	}

   
  if(correctFormat){
      price.id = priceId;
      price.price = document.getElementById("updatePricePrice").value;
      price.start_date = new Date(document.getElementById("updatePriceStartYear").value, document.getElementById("updatePriceStartMonth").value, document.getElementById("updatePriceStartDay").value, 0,0,0);
      price.end_date = new Date(document.getElementById("updatePriceEndYear").value, document.getElementById("updatePriceEndMonth").value, document.getElementById("updatePriceEndDay").value, 0,0,0);
      alert("Zaktualizowano cene");
	  http.send(JSON.stringify(price));
  }
}

function update(id){
	$('html, body').animate({ scrollTop: 0 }, 'fast');
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


function showAddPrice(){
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
            "<td><a href=\"javascript:showAddPrice();\"><i class=\"fa fa-plus icons-margin\"></i></a></td>"+
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