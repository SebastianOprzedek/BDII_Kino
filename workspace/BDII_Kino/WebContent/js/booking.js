var chosenPlaces = [];
var chosenTicketTypes = [];

document.addEventListener("DOMContentLoaded", function (event) {
    var url = new URL(window.location.href);
     var id = url.searchParams.get("id");
    setFilmTitleHeader(id);
    updateTable(id);
});

function updateTable(id) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var shows = JSON.parse(this.response)["shows"];
            if (shows.length == 0)
                document.getElementById("table").innerHTML = "Lista seansów dla tego filmu jest pusta";
            else {
                createTable(shows);
            }
        }
    };
    http.open("GET", "/cinema/rest/film/" + id + "/shows", true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}

function createTable(shows) {
    var table = document.getElementById("table");
    var showsTable = document.createElement('table');

    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    showsTable.style.width = '100%';
    showsTable.classList.add('content');
    showsTable.classList.add('table');
    showsTable.classList.add('table-hover');
    showsTable.classList.add('table-bordered');
    showsTable.classList.add('text-center');
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.appendChild(document.createTextNode('Data'));
    tr.appendChild(th);
    th = document.createElement('th');
    th.appendChild(document.createTextNode('Godzina'));
    tr.appendChild(th);
    th = document.createElement('th');
    th.appendChild(document.createTextNode('Sala'));
    tr.appendChild(th);
    th = document.createElement('th');
    th.appendChild(document.createTextNode('Rezerwuj'));
    tr.appendChild(th);
    thead.appendChild(tr)
    showsTable.appendChild(thead);

    var tbody = document.createElement('tbody');
    for (var i = 0; i < shows.length; i++) {
        var showDate = new Date(shows[i].data);
        var tr = document.createElement('tr');
        var td = document.createElement('td');
        td.appendChild(document.createTextNode(showDate.getUTCDate().toString() + "/" + (showDate.getUTCMonth() + 1).toString() + "/" + showDate.getUTCFullYear().toString()));
        tr.appendChild(td);
        td = document.createElement('td');
        var hours = (showDate.getUTCHours() + 2).toString(); //+2 bo nie wiem czemu nie ogarnia strefy czasowej pacan jeden
        var minutes;
        if (showDate.getUTCMinutes() < 10)
            minutes = "0" + showDate.getUTCMinutes().toString();
        else
            minutes = showDate.getUTCMinutes().toString();
        var showTime = hours + ":" + minutes;
        td.appendChild(document.createTextNode(showTime));
        tr.appendChild(td);
        td = document.createElement('td');
        td.appendChild(document.createTextNode(shows[i].hall.name));
        tr.appendChild(td);
        td = document.createElement('td');
        var button = document.createElement('button');
        button.classList.add('btn');
        button.classList.add('btn-primary');
        button.classList.add('btn-sm');
        button.type = "button";
        button.onclick = (function () {
            var show = shows[i];
            return function () {
                popup(show);
            }
        })();
        var t = document.createTextNode("Wybierz");
        button.appendChild(t);
        td.appendChild(button);
        tr.appendChild(td);
        tbody.appendChild(tr);
    }
    showsTable.appendChild(tbody);
    table.appendChild(showsTable);
}
var showIdGlobal;
function popup(show) {
    chosenPlaces = [];
   showIdGlobal = show.id;
    document.getElementById("popupBox").style.display = 'block';
    var showDate = new Date(show.data);
    var showDay = showDate.getUTCDate().toString();
    var showMonth = (showDate.getUTCMonth() + 1).toString();
    var showYear = showDate.getUTCFullYear().toString();
    var showHours = (showDate.getUTCHours() + 2).toString(); //+2 bo nie wiem czemu nie ogarnia strefy czasowej pacan jeden
    var showMinutes;
    if (showDate.getUTCMinutes() < 10)
        showMinutes = "0" + showDate.getUTCMinutes().toString();
    else
        showMinutes = showDate.getUTCMinutes().toString();
    var showDateString = showDay + "/" + showMonth + "/" + showYear + "  " + showHours + ":" + showMinutes;
    var content = "";
    content += "<h1>" + show.film.title;
    content += "<div class=\"btn-group\" role=\"group\" style=\"float:right\">";
    content += "<a class=\"btn btn-secondary btn-sm\" role=\"button\" onclick=\"closePopup();\">X</a></div></h1>";
    content += "<b>" + showDateString + "</b>"
    content += "<h2>Szczegoly rezerwacji</h2>";
    content += "<div id=\"reservation\"></div>";
    content += "<button class=\"btn btn-primary \"onclick=\"reserve();\" style=\"float:right\">Potwierdz</button>"
    content += "<div class=\"clearfix\"/>";
    document.getElementById("popupContent").innerHTML = content;
    createReservationBox(show.id);
}

function reserve(){
  for(var i=0; i< chosenPlaces.length; i++){
   sendTicket(showIdGlobal, chosenPlaces[i], chosenTicketTypes[i]);
  }
}

function sendTicket(showId, placeNumber, ticketTypeValue) {
  console.log("Wysylam bilet: ShowId: " +showId + ", Number miejsca: " + placeNumber + ", Typ biletu: " + ticketTypeValue);
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
      closePopup();
      if (this.readyState == 4 && this.status == 200) {
          console.log(this.response);
      }

  };
  http.open("POST", "/cinema/rest/ticket", true);
  http.setRequestHeader("Content-Type", "application/json");
  var ticket = new Object();
  ticket.place = place(show(showId),placeNumber);
  ticket.show = show(showId);
  ticket.ticketType = ticketType(ticketTypeValue);
  http.send(JSON.stringify(ticket));
}

function closePopup() {
    document.getElementById("popupBox").style.display = 'none';
}

function createReservationBox(showId) {

    var table = document.getElementById("reservation");
    var reservationTable = document.createElement('table');

    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    reservationTable.style.width = '100%';
    reservationTable.classList.add('content');
    reservationTable.classList.add('table');
    reservationTable.classList.add('table-hover');
    reservationTable.classList.add('table-bordered');
    reservationTable.classList.add('text-center');
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    var th = document.createElement('th');
    th.appendChild(document.createTextNode('Miejsce (sektor)'));
    tr.appendChild(th);
    th = document.createElement('th');
    th.appendChild(document.createTextNode('Typ biletu (cena)'));
    tr.appendChild(th);
    th = document.createElement('th');
    th.appendChild(document.createTextNode('Dodaj bilet'));
    tr.appendChild(th);
    thead.appendChild(tr)
    reservationTable.appendChild(thead);

    var tbody = document.createElement('tbody');
    tbody.setAttribute("id", "reservationTableBody");
    reservationTable.appendChild(tbody);
    table.appendChild(reservationTable);
    ticketsList(showId);
}

function ticketsList(showId) {
    var showPlaces = freePlaces(showId);
    var actualTicketTypes = ticketTypes();

    var reservationTableBody = document.getElementById("reservationTableBody");
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var placeSelect = document.createElement('select');
    placeSelect.setAttribute("id", "placeSelect");
    for (i = 0; i < showPlaces.length; i++) {
        placeSelect.options[placeSelect.options.length] = new Option(showPlaces[i].number + ' (' + showPlaces[i].sector.name + ')', showPlaces[i].number);
    }
    td.appendChild(placeSelect);
    tr.appendChild(td);
    td = document.createElement('td');
    var biletTypeSelect = document.createElement('select');
    for (i = 0; i < actualTicketTypes.length; i++) {
        biletTypeSelect.options[biletTypeSelect.options.length] = new Option(actualTicketTypes[i].name + ' (' + actualTicketTypes[i].pricelist.price.price + ')', actualTicketTypes[i].name);
    }
    td.appendChild(biletTypeSelect);
    tr.appendChild(td);
    td = document.createElement('td');
    var button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.classList.add('btn-sm');
    button.type = "button";
    button.onclick = function () {
        var placeSelectValue = placeSelect.value;
        var placeSelectText = placeSelect.options[placeSelect.selectedIndex].text;
        var biletTypeSelectValue = biletTypeSelect.value;
        addTicket(placeSelectValue, placeSelectText, biletTypeSelectValue);
    };
    var t = document.createTextNode("Dodaj bilet"); //TODO bootstrapowy plusik
    button.appendChild(t);
    td.appendChild(button);
    tr.appendChild(td);
    reservationTableBody.appendChild(tr);
    var tr2 = document.createElement('tr');
    var td2 = document.createElement('td');
    td2.appendChild(document.createTextNode('wybrane:'));
    tr2.appendChild(td2);
    reservationTableBody.appendChild(tr2);
}

function updatePlacelist(){
  var places = freePlaces(showIdGlobal);
  var freePlacesWithoutChosen = [];
  for(i = 0; i < places.length; i++){
    if(chosenPlaces.indexOf(places[i].number.toString()) == -1){
      freePlacesWithoutChosen.push(places[i]);
    }
  }
 var placeSelect = document.getElementById("placeSelect");
 var length = placeSelect.options.length;
  for (i = 0; i < length; i++) { // czyszczenie selecta
    placeSelect.options[i] = null;
  }
  for (i = 0; i < freePlacesWithoutChosen.length; i++) {
      placeSelect.options[i] = new Option(freePlacesWithoutChosen[i].number + ' (' + freePlacesWithoutChosen[i].sector.name + ')', freePlacesWithoutChosen[i].number);
  }
}

function addTicket(placeSelectValue, placeSelectText, biletTypeSelectValue) {
    chosenPlaces.push(placeSelectValue);
    chosenTicketTypes.push(biletTypeSelectValue);
    updatePlacelist();
    var reservationTableBody = document.getElementById("reservationTableBody");
    var tr = document.createElement('tr');
    tr.setAttribute("id", "bilet_"+placeSelectValue);
    var td = document.createElement('td');
    var place = document.createTextNode(placeSelectText);
    td.appendChild(place);
    tr.appendChild(td);
    td = document.createElement('td');
    var biletType = document.createTextNode(biletTypeSelectValue);
    td.appendChild(biletType);
    tr.appendChild(td);
    td = document.createElement('td');
    var button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.classList.add('btn-sm');
    button.type = "button";
    button.onclick = function () {
      var number = placeSelectValue;
        deleteTicket(number);
        updatePlacelist();
    };
    var t2 = document.createTextNode("Usun bilet");
    button.appendChild(t2);
    td.appendChild(button);
    tr.appendChild(td);
    reservationTableBody.appendChild(tr);
}

function deleteTicket(number){
  chosenTicketTypes.splice(chosenPlaces.indexOf(number.toString()), 1);
  chosenPlaces.splice(chosenPlaces.indexOf(number.toString()), 1);
  var row = document.getElementById("bilet_"+number);
  row.parentElement.removeChild(row);
}

function setFilmTitleHeader(id) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200)
            document.getElementById("header-title").innerHTML = JSON.parse(this.response).title;
    }
    http.open("GET", "/cinema/rest/film/" + id, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}

function freePlaces(id) {
    var freePlaces;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200)
            freePlaces = JSON.parse(this.response)["places"];
    }
    http.open("GET", "/cinema/rest/place/free/" + id, false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    return freePlaces;
}

function ticketTypes() {
    var ticketTypes;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200)
            ticketTypes = JSON.parse(this.response)['ticketTypes'];
    }
    http.open("GET", "/cinema/rest/ticket_type", false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    return ticketTypes;
}

function place(show, priceNumber) {
    var place = -1;
    var showId = show.id;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var places = JSON.parse(this.response)["places"];
            for(var i=0;i<places.length;i++){
                if (places[i]["number"] == priceNumber)
                    place = places[i];
            }
        };
    }
    http.open("GET", "/cinema/rest/place/free/"+showId, false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    return place;
}

function show(showIdLocal) {
    var show = -1;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var shows = JSON.parse(this.response)["shows"];
            for(var i=0;i<shows.length;i++){
                if (shows[i]["id"] == showIdLocal)
                      show = shows[i];
            }
        };
    }
    http.open("GET", "/cinema/rest/show", false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    return show;
}

function ticketType(typeName) {
    var type = -1;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var ticketTypes = JSON.parse(this.response)["ticketTypes"];
            for(var i=0;i<ticketTypes.length;i++){
                if (ticketTypes[i].name == typeName)
                  type = ticketTypes[i];
            }
        };
    }
    http.open("GET", "/cinema/rest/ticket_type", false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    return type;
}

function getFormattedDate(date) {
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var min = date.getMinutes();
    month = (month < 10 ? "0" : "") + month;
    day = (day < 10 ? "0" : "") + day;
    hour = (hour < 10 ? "0" : "") + hour;
    min = (min < 10 ? "0" : "") + min;
    var str = date.getFullYear() + "-" + month + "-" + day + " " +  hour + ":" + min;
    return str;
}
