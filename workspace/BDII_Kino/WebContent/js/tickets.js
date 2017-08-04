var ticketId;

document.addEventListener("DOMContentLoaded", function(event) {
  updateTable();
  document.getElementById("addTicket").style.display = "none";
  document.getElementById("updateTicket").style.display = "none";
});

function addTicket() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    updateTable();
  };
  http.open("POST", "/cinema/rest/ticket", true);
  http.setRequestHeader("Content-Type", "application/json");
  var ticket = new Object();

   if ($('#addTicketPlace').val() == '' || place($('#addTicketPlace').val()) == -1 ||
   $('#addTicketShow').val() == '' || show($('#addTicketShow').val()) == -1 ||
   $('#addTicketType').val() == '' || ticketType($('#addTicketType').val()) == -1){
    alert("Dane niekompletne");
  }
   else {
    ticket.place = place($('#addTicketPlace').val());
    ticket.show = show($('#addTicketShow').val());
    ticket.ticketType = ticketType($('#addTicketType').val());
    http.send(JSON.stringify(ticket));
  }
  document.getElementById("addTicket").style.display = "none";
}

function updateTicket(id) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    console.log("TUTAJ")
    updateTable();
  };
  http.open("PUT", "/cinema/rest/ticket/"+id, true);
  http.setRequestHeader("Content-Type", "application/json");
  var ticket = new Object();
  if (  $('#updateTicketShow').val() == '' || show($('#updateTicketShow').val()) == -1 ||
  $('#updateTicketPlace').val() == '' || place(show($('#updateTicketShow').val()),$('#updateTicketPlace').val()) == -1 ||
  $('#updateTicketType').val() == '' || ticketType($('#updateTicketType').val()) == -1){
   alert("Dane niekompletne");
  }
   else {
    ticket.show = show($('#updateTicketShow').val());
    ticket.place = place(show($('#updateTicketShow').val()),$('#updateTicketPlace').val());
    ticket.ticketType = ticketType($('#updateTicketType').val());
    http.send(JSON.stringify(ticket));
  }
  document.getElementById("updateTicket").style.display = "none";
}
function update(id){
    document.getElementById("addTicket").style.display = "none";
    ticketId = id;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            document.getElementById("updateTicket").style.display = "block";
            var ticket = JSON.parse(this.response);
            showShowOptions(document.getElementById("updateTicketShow"));
            showPlaceOptions(ticket.show, document.getElementById("updateTicketPlace"));
            showTypeOptions(document.getElementById("updateTicketType"));
            document.getElementById("updateTicketPlace").value = ticket.place.number;
            document.getElementById("updateTicketShow").value = ticket.show.film.title+" - " + getFormattedDate(new Date(ticket.show.data)) + " - " + ticket.show.hall.name
            document.getElementById("updateTicketType").value = ticket.ticketType.name;
        }
    };
    http.open("GET", "/cinema/rest/ticket/" + id, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}

function showAddTicket(){
  	document.getElementById("addTicket").style.display = "block";
  	document.getElementById("updateTicket").style.display = "none";
    showShowOptions(document.getElementById("addTicketShow"));
    showPlaceOptions(show(document.getElementById("addTicketShow").value), document.getElementById("addTicketPlace"));
    showTypeOptions(document.getElementById("addTicketType"));
}

function deleteById(id) {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
	   updateTable();
  };
  http.open("DELETE", "/cinema/rest/ticket/" + id, true);
  http.send();
}

function updateTable() {
  var http = new XMLHttpRequest();
  http.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200){
      var ticket = JSON.parse(this.response)["tickets"];
      var rows = "";
      rows += "<tr>"+
            "<td><b>Miejsce</b></td>"+
            "<td><b>Seans</b></td>"+
            "<td><b>Typ biletu</b></td>"+
            "<td><a href=\"javascript:showAddTicket();\"><i class=\"fa fa-plus icons-margin\"></i></a></td>"+
            "</tr>";
      for(var i=0;i<ticket.length;i++){
          rows += "<tr><td>"+ticket[i]["place"]["number"]+"</td><td>"+ticket[i]["show"]["film"]["title"] +" - " + getFormattedDate(new Date(ticket[i]["show"]["data"])) + " - " + ticket[i]["show"]["hall"]["name"] +"</td><td>"+ticket[i]["ticketType"]["name"]+"</td><td><a href=\"javascript:update("+ticket[i]["id"]+")\"><i class=\"fa fa-pencil icons-margin\"></i></a><a href=\"javascript:deleteById(" + ticket[i]["id"] + ");\"><i class=\"fa fa-trash icons-margin\"></i></a></td></tr>";
        }
      document.getElementById("table").innerHTML = "<table class=\"table table-condensed\" width=\"100%\">" + rows + "</table>";
     }
  };
  http.open("GET", "/cinema/rest/ticket", true);
  http.setRequestHeader("Content-type", "application/json");
  http.send();
}

function place(show, priceNumber) {
    var place = -1;
    var hallId = show.hall.id;
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
    http.open("GET", "/cinema/rest/place/"+hallId, false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    return place;
}

function show(showString) {
    var show = -1;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var shows = JSON.parse(this.response)["shows"];
            for(var i=0;i<shows.length;i++){
                if ((shows[i]["film"]["title"] +" - " + getFormattedDate(new Date(shows[i]["data"])) + " - " + shows[i]["hall"]["name"]) == showString)
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
            for(var i=0;i<places.length;i++){
                if (ticketTypes[i]["name"] == typeName)
                  type = ticketTypes[i];
            }
        };
    }
    http.open("GET", "/cinema/rest/ticket_type", false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    return type;
}

function showPlaceOptions(show, placesDocument) {
    var options = "";
    var hallId = show.hall.id;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            places = JSON.parse(this.response)["places"];
            for(var i = 0; i < places.length; i++){
                options += '<option value="'+places[i]["number"]+'">'+places[i]["number"]+'</option>';
            }
        }
    };
    http.open("GET", "/cinema/rest/place/"+hallId, false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    placesDocument.innerHTML = options;
}

function showShowOptions(showsDocument) {
    var options = "";
    var http = new XMLHttpRequest();
    var shows;
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            shows = JSON.parse(this.response)["shows"];
            for(var i = 0; i < shows.length; i++){
                var show = shows[i]["film"]["title"] +" - " + getFormattedDate(new Date(shows[i]["data"])) + " - " + shows[i]["hall"]["name"];
                options += '<option value="'+show+'">'+ show +'</option>';
            }
            showsDocument.innerHTML = options;
            return shows[0]["film"]["title"] +" - " + getFormattedDate(new Date(shows[0]["data"])) + " - " + shows[0]["hall"]["name"];
        }
    };
    http.open("GET", "/cinema/rest/show", false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}

function showTypeOptions(typesDocument) {
    var options = "";
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            ticketTypes = JSON.parse(this.response)["ticketTypes"];
            for(var i = 0; i < ticketTypes.length; i++){
                options += '<option value="'+ticketTypes[i]["name"]+'">'+ticketTypes[i]["name"]+'</option>';
            }
        }
    };
    http.open("GET", "/cinema/rest/ticket_type", false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    typesDocument.innerHTML = options;
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
