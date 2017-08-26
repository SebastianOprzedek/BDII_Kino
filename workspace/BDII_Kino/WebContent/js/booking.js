document.addEventListener("DOMContentLoaded", function (event) {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    updateTable(id);
});

function updateTable(id) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var shows = JSON.parse(this.response)["shows"];
            console.log(shows);
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

function popup(show) {
    console.log(show);
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
    content += "<h1>" + show.film.title ;
    content += "<div class=\"btn-group\" role=\"group\" style=\"float:right\">";
    content += "<a class=\"btn btn-secondary btn-sm\" role=\"button\" onclick=\"closePopup();\">X</a></div></h1>";
    content += "<b>" + showDateString + "</b>"
    content += "<h2>Wybierz miejsca</h2>";
    content += "<p>Tu jakos bedzie wybor miejsc</p>";
    content += "<div class=\"clearfix\"/>";
    document.getElementById("popupContent").innerHTML = content;
}

function closePopup() {
    document.getElementById("popupBox").style.display = 'none';
}
