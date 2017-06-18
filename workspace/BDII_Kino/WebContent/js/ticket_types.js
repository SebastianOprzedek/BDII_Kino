var ticketTypeId;

document.addEventListener("DOMContentLoaded", function(event) {
    updateTable();
    document.getElementById("addTicketType").style.display = "none";
    document.getElementById("updateTicketType").style.display = "none";
});

function addTicketType() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        updateTable();
    };
    http.open("POST", "/cinema/rest/ticket_type", true);
    http.setRequestHeader("Content-Type", "application/json");
    var ticketType = new Object();

    if (pricelist($('#addTicketTypePricelist').val()) == -1) {
        alert("Dane niekompletne");
    } else {
        ticketType.name = $('#addTicketTypeName').val();
        ticketType.pricelist = pricelist($('#addTicketTypePricelist').val());
        http.send(JSON.stringify(ticketType));
    }
}

function updateTicketType(id) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        updateTable();
    };
    http.open("PUT", "/cinema/rest/ticket_type/" + id, true);
    http.setRequestHeader("Content-Type", "application/json");
    var ticketType = new Object();

    if (pricelist($('#updateTicketTypePricelist').val()) == -1) {
        alert("Dane niekompletne");
    } else {
        ticketType.name = $('#updateTicketTypeName').val();
        ticketType.pricelist = pricelist($('#updateTicketTypePricelist').val());
        http.send(JSON.stringify(ticketType));
    }
}

function update(id) {
    $('html, body').animate({
        scrollTop: 0
    }, 'fast');
    document.getElementById("addTicketType").style.display = "none";
    ticketTypeId = id;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("updateTicketType").style.display = "block";
            var ticket = JSON.parse(this.response);
            showPricelistOptions(document.getElementById("updateTicketTypePricelist"));
            document.getElementById("updateTicketTypeName").value = ticket.name;
            document.getElementById("updateTicketTypePricelist").value = ticket.pricelist.price.price;
        }
    };
    http.open("GET", "/cinema/rest/ticket_type/" + id, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}

function showAddTicketType() {
    document.getElementById("addTicketType").style.display = "block";
    document.getElementById("updateTicketType").style.display = "none";
    showPricelistOptions(document.getElementById("addTicketTypePricelist"));
}

function updateTable() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var ticketTypes = JSON.parse(this.response)["ticketTypes"];
            var rows = "";
            rows += "<tr>" +
                "<td><b>Nazwa</b></td>" +
                "<td><b>Cennik</b></td>" +
                "<td><a href=\"javascript:showAddTicketType();\"><i class=\"fa fa-plus icons-margin\"></i></a></td>" +
                "</tr>";
            for (var i = 0; i < ticketTypes.length; i++) {
                rows += "<tr><td>" + ticketTypes[i]["name"] + "</td><td>" + ticketTypes[i]["pricelist"]["price"]["price"] + "</td><td><a href=\"javascript:update(" + ticketTypes[i]["id"] + ")\"><i class=\"fa fa-pencil icons-margin\"></i></a><a href=\"javascript:deleteById(" + ticketTypes[i]["id"] + ");\"><i class=\"fa fa-trash icons-margin\"></i></a></td></tr>";
            }
            document.getElementById("table").innerHTML = "<table class=\"table table-condensed\" width=\"100%\">" + rows + "</table>";
        }
    };
    http.open("GET", "/cinema/rest/ticket_type", true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}

function deleteById(id) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4)
            updateTable();
    };
    http.open("DELETE", "/cinema/rest/ticket_type/" + id, true);
    http.send();
}

function pricelist(pricelistName) {
    var pricelist = -1;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var pricelists = JSON.parse(this.response)["pricelists"];
            for (var i = 0; i < pricelists.length; i++) {
                console.log(pricelistName);
                if (pricelists[i]["price"]["price"] == pricelistName)
                    pricelist = pricelists[i];
            }
        };
    }
    http.open("GET", "/cinema/rest/pricelist", false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    console.log(pricelist);
    return pricelist;
}

function showPricelistOptions(pricelistElement) {
    var options = "";
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            pricelists = JSON.parse(this.response)["pricelists"];
            for (var i = 0; i < pricelists.length; i++) {
                options += '<option value="' + pricelists[i]["price"]["price"] + '">' + pricelists[i]["price"]["price"] + '</option>';
            }
        }
    };
    http.open("GET", "/cinema/rest/pricelist", false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    pricelistElement.innerHTML = options;
}
