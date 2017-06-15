var hallId;

document.addEventListener("DOMContentLoaded", function(event) {
    updateTable();
    document.getElementById("addHall").style.display = "none";
    document.getElementById("updateHall").style.display = "none";
    document.getElementById("places").style.display = "none";
});

function addHall() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        updateTable();
    };
    http.open("POST", "/cinema/rest/hall", true);
    http.setRequestHeader("Content-Type", "application/json");
    var hall = new Object();

    if ($('#addHallName').val() == '') {
        alert("Dane niekompletne");
    } else {
        hall.name = $('#addHallName').val();
        http.send(JSON.stringify(hall));
    }
    document.getElementById("addHall").style.display = "none";
    document.getElementById("places").style.display = "none";
}

function updateHall(id) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        updateTable();
    };
    http.open("PUT", "/cinema/rest/hall/" + id, true);
    http.setRequestHeader("Content-Type", "application/json");
    var hall = new Object();

    if ($('#updateHallName').val() == '') {
        alert("Dane niekompletne");
    } else {
        hall.id = id;
        hall.name = $('#updateHallName').val();
        http.send(JSON.stringify(hall));
    }
    document.getElementById("updateHall").style.display = "none";
}

function update(id) {
    document.getElementById("addHall").style.display = "none";
    hallId = id;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("updateHall").style.display = "block";
            document.getElementById("places").style.display = "none";
            var hall = JSON.parse(this.response);
            document.getElementById("updateHallName").value = hall.name;
        }
    };
    http.open("GET", "/cinema/rest/hall/" + id, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}

function showAddHall() {
    document.getElementById("addHall").style.display = "block";
    document.getElementById("updateHall").style.display = "none";
    document.getElementById("places").style.display = "none";
    document.getElementById("addHallName").value = "";
}

function showPlaces(id) {
    hallId = id;
    document.getElementById("places").style.display = "block";
    document.getElementById("addHall").style.display = "none";
    document.getElementById("updateHall").style.display = "none";
    showPlaceList(id, document.getElementById("placesContainer"), true, 0);
    document.getElementById("placesCount").value = $('#placesTable tr').length - 1;
}

function setSize(){
  showPlaceList(hallId, document.getElementById("placesContainer"), false, document.getElementById("placesCount").value);
}

function savePlaces(){
  var placesObject = new Object();
  var places = [];
  var size = $('#placesTable tr').length - 1;
  for(var i=0; i < size; i++){
    var place = new Object();
    place.number = i+1;
    place.sector = sector(document.getElementById("select"+i).value);
    places[i] = place;
  }
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        updateTable();
        document.getElementById("addHall").style.display = "none";
        document.getElementById("updateHall").style.display = "none";
        document.getElementById("places").style.display = "none";
      }
    }
  http.open("PUT", "/cinema/rest/place/"+hallId, false);
  http.setRequestHeader("Content-type", "application/json");
  placesObject.places = places;
  var json = JSON.stringify(placesObject);
  http.send(json);
}

function updateTable() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var halls = JSON.parse(this.response)["halls"];
            var rows = "";
            rows += "<tr>" +
                "<td><b>Nazwa</b></td>" +
                "<td><a href=\"javascript:showAddHall();\"><i class=\"fa fa-plus icons-margin\"></i></a></td>" +
                "</tr>";
            for (var i = 0; i < halls.length; i++) {
                var hall = new Object();
                hall = halls[i];
                rows += "<tr><td>" + halls[i]["name"] + "</td><td><a href=\"javascript:update(" + halls[i]["id"] + ")\"><i class=\"fa fa-pencil icons-margin\"></i></a><a href=\"javascript:deleteById(" + halls[i]["id"] + ");\"><i class=\"fa fa-trash icons-margin\"></i></a><a href=\"javascript:showPlaces(" + halls[i]["id"] + ");\"><i class=\"fa fa-th icons-margin\"></i></a></td></tr>";
            }
            document.getElementById("table").innerHTML = "<table class=\"table table-condensed\" width=\"100%\">" + rows + "</table>";
        }
    };
    http.open("GET", "/cinema/rest/hall", true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}

function deleteById(id) {
    document.getElementById("updateHall").style.display = "none";
    document.getElementById("places").style.display = "none";
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4)
            updateTable();
    };
    http.open("DELETE", "/cinema/rest/hall/" + id, true);
    http.send();
}

function getSectors() {
  var sectors = [];
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          sectors = JSON.parse(this.response)["sectors"];
    };
  }
  http.open("GET", "/cinema/rest/sector", false);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
  return sectors;
}

function showPlaceList(id, placeContainer, orginal, size) {
    var sectors = getSectors();
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var places = JSON.parse(this.response)["places"];
            tbl = document.createElement('table');
            while (placeContainer.firstChild) {
                placeContainer.removeChild(placeContainer.firstChild);
            }
            tbl.style.width = '100%';
            tbl.classList.add('table');
            tbl.classList.add('table-condensed');
            tbl.setAttribute("id", "placesTable");

            var tr = document.createElement('tr');
            var td = document.createElement('td');
            td.appendChild(document.createTextNode('Numer'));
            tr.appendChild(td);
            td = document.createElement('td');
            td.appendChild(document.createTextNode('Sektor'));
            tr.appendChild(td);
            tbl.appendChild(tr);
            if(orginal)
              size = places.length
            for (var i = 0; i < size; i++) {
                var tr = document.createElement('tr');
                var td = document.createElement('td');
                td.appendChild(document.createTextNode(i+1));
                tr.appendChild(td);
                td = document.createElement('td');
                var select = document.createElement('select');
                select.setAttribute("id", "select" + i);
                for (var j = 0; j < sectors.length; j++) {
                  var option = document.createElement("option");
                  option.value = sectors[j]["name"];
                  option.text = sectors[j]["name"];
                  select.appendChild(option);
                }
                if(places[i] != undefined)
                  select.value = places[i]["sector"]["name"];
                else
                  select.value = sectors[0]["name"];
                td.appendChild(select);
                tr.appendChild(td);
                tbl.appendChild(tr);
            }
            placeContainer.appendChild(tbl);
        }
    };
    http.open("GET", "/cinema/rest/place/" + id, false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}

function sector(sectorName) {
  var sector = -1;
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
          var sectors = JSON.parse(this.response)["sectors"];
          for(var i=0;i<sectors.length;i++){
          if (sectors[i]["name"] == sectorName)
            sector = sectors[i];
          }
    };
  }
  http.open("GET", "/cinema/rest/sector", false);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
  return sector;
}
