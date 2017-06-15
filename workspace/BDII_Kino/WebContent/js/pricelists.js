var pricelistId;

document.addEventListener("DOMContentLoaded", function(event) {
  updateTable();
  document.getElementById("addPricelist").style.display = "none";
  document.getElementById("updatePricelist").style.display = "none";
});

function addPricelist() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    updateTable();
  };
  http.open("POST", "/cinema/rest/pricelist", true);
  http.setRequestHeader("Content-Type", "application/json");
  var pricelist = new Object();

   if ($('#addPricelistPrice').val() == ''){
    alert("Dane niekompletne");
  }
   else {
    pricelist.price = price($('#addPricelistPrice').val());
	alert("Dodano nowa cene do cennika");
    http.send(JSON.stringify(pricelist));
  }
}

function updatePricelist(id) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    updateTable();
  };
  http.open("PUT", "/cinema/rest/pricelist/"+id, true);
  http.setRequestHeader("Content-Type", "application/json");
  var pricelist = new Object();

   if ($('#updatePricelistPrice').val() == '' || price($('#updatePricelistPrice').val()) == -1){
    alert("Błędne dane");
  }
   else {
    pricelist.id = id;
    pricelist.price = price($('#updatePricelistPrice').val());
	alert("Zaktualizowano cennik");
    http.send(JSON.stringify(pricelist));
  }
}
function update(id){
	$('html, body').animate({ scrollTop: 0 }, 'fast');
    document.getElementById("addPricelist").style.display = "none";
    pricelistId = id;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            document.getElementById("updatePricelist").style.display = "block";
            var pricelist = JSON.parse(this.response);
            showPriceOptions(document.getElementById("updatePricelistPrice"));
            document.getElementById("updatePricelistPrice").value = pricelist.price.price;
        }
    };
    http.open("GET", "/cinema/rest/pricelist/" + id, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}

function showAddPricelist(){
  	document.getElementById("addPricelist").style.display = "block";
  	document.getElementById("updatePricelist").style.display = "none";
    showPriceOptions(document.getElementById("addPricelistPrice"));
}

function deleteById(id) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
	   updateTable();
  };
  http.open("DELETE", "/cinema/rest/pricelist/" + id, true);
  http.send();
}

function updateTable() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      var pricelist = JSON.parse(this.response)["pricelists"];
      var rows = "";
      rows += "<tr>"+
            "<td><b>Cena</b></td>"+
            "<td><a href=\"javascript:showAddPricelist();\"><i class=\"fa fa-plus icons-margin\"></i></a></td>"+
            "</tr>";
      for(var i=0;i<pricelist.length;i++){
          rows += "<tr><td>"+pricelist[i]["price"]["price"]+"</td><td><a href=\"javascript:update("+pricelist[i]["id"]+")\"><i class=\"fa fa-pencil icons-margin\"></i></a><a href=\"javascript:deleteById(" + pricelist[i]["id"] + ");\"><i class=\"fa fa-trash icons-margin\"></i></a></td></tr>";
        }
      document.getElementById("table").innerHTML = "<table class=\"table table-condensed\" width=\"100%\">" + rows + "</table>";
     }
  };
  http.open("GET", "/cinema/rest/pricelist", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}

function price(priceName) {
    var price = -1;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var prices = JSON.parse(this.response)["prices"];
            for(var i=0;i<prices.length;i++){
                if (prices[i]["price"] == priceName)
                    price = prices[i];
            }
        };
    }
    http.open("GET", "/cinema/rest/price", false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    return price;
}

function showPriceOptions(filmsDocument) {
    var options = "";
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            prices = JSON.parse(this.response)["prices"];
            for(var i = 0; i < prices.length; i++){
                options += '<option value="'+prices[i]["price"]+'">'+prices[i]["price"]+'</option>';
            }
        }
    };
    http.open("GET", "/cinema/rest/price", false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    filmsDocument.innerHTML = options;
}
