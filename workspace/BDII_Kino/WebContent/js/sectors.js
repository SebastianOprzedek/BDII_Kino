var sectorId;

document.addEventListener("DOMContentLoaded", function(event) {
  updateTable();
  document.getElementById("addSector").style.display = "none";
  document.getElementById("updateSector").style.display = "none";
});

function addSector() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    updateTable();
  };
  http.open("POST", "/cinema/rest/sector", true);
  http.setRequestHeader("Content-Type", "application/json");
  var sector = new Object();

   if ($('#addSectorPricelist').val() == '' || pricelist($('#addSectorPricelist').val()) == -1 || $('#addSectorName').val() == ''){
    alert("Dane niekompletne");
  }
   else {
    sector.pricelist = pricelist($('#addSectorPricelist').val());
    sector.name = $('#addSectorName').val();
    http.send(JSON.stringify(sector));
  }
  document.getElementById("addSector").style.display = "none";
}

function updateSector(id) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    updateTable();
  };
  http.open("PUT", "/cinema/rest/sector/"+id, true);
  http.setRequestHeader("Content-Type", "application/json");
  var sector = new Object();

   if ($('#updateSectorPricelist').val() == '' || pricelist($('#updateSectorPricelist').val()) == -1 || $('#updateSectorName').val() == ''){
    alert("Dane niekompletne");
  }
   else {
    sector.pricelist = pricelist($('#updateSectorPricelist').val());
    sector.name = $('#updateSectorName').val();
    http.send(JSON.stringify(sector));
  }
  document.getElementById("updateSector").style.display = "none";
}
function update(id){
    document.getElementById("addSector").style.display = "none";
    sectorId = id;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            document.getElementById("updateSector").style.display = "block";
            var sector = JSON.parse(this.response);
            showPricelistOptions(document.getElementById("updateSectorPricelist"));
            document.getElementById("updateSectorName").value = sector.name;
            document.getElementById("updateSectorPricelist").value = sector.pricelist.price.price;
        }
    };
    http.open("GET", "/cinema/rest/sector/" + id, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}

function showAddSector(){
  	document.getElementById("addSector").style.display = "block";
  	document.getElementById("updateSector").style.display = "none";
    showPricelistOptions(document.getElementById("addSectorPricelist"));
}

function deleteById(id) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
	   updateTable();
  };
  http.open("DELETE", "/cinema/rest/sector/" + id, true);
  http.send();
}

function updateTable() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      var sector = JSON.parse(this.response)["sectors"];
      var rows = "";
      rows += "<tr>"+
            "<td><b>Nazwa</b></td>"+
            "<td><b>Cennik</b></td>"+
            "<td><a href=\"javascript:showAddSector();\"><i class=\"fa fa-plus icons-margin\"></i></a></td>"+
            "</tr>";
      for(var i=0;i<sector.length;i++){
          rows += "<tr><td>"+sector[i]["name"]+"</td><td>"+sector[i]["pricelist"]["price"]["price"]+"</td><td><a href=\"javascript:update("+sector[i]["id"]+")\"><i class=\"fa fa-pencil icons-margin\"></i></a><a href=\"javascript:deleteById(" + sector[i]["id"] + ");\"><i class=\"fa fa-trash icons-margin\"></i></a></td></tr>";
        }
      document.getElementById("table").innerHTML = "<table class=\"table table-condensed\" width=\"100%\">" + rows + "</table>";
     }
  };
  http.open("GET", "/cinema/rest/sector", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}

function pricelist(priceName) {
    var price = -1;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var pricelists = JSON.parse(this.response)["pricelists"];
            for(var i=0;i<pricelists.length;i++){
                if (pricelists[i]["price"]["price"] == priceName)
                    price = pricelists[i];
            }
        };
    }
    http.open("GET", "/cinema/rest/pricelist", false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    return price;
}

function showPricelistOptions(filmsDocument) {
    var options = "";
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            pricelists = JSON.parse(this.response)["pricelists"];
            for(var i = 0; i < pricelists.length; i++){
                options += '<option value="'+pricelists[i]["price"]["price"]+'">'+pricelists[i]["price"]["price"]+'</option>';
            }
        }
    };
    http.open("GET", "/cinema/rest/pricelist", false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    filmsDocument.innerHTML = options;
}
