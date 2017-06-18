document.addEventListener("DOMContentLoaded", function (event) {
    updateTable();
});

function updateTable() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var films = JSON.parse(this.response)["films"];
            createTable(films);
        }
    };
    http.open("GET", "/cinema/rest/film", true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}

function popup(film) {
    document.getElementById("popupBox").style.display = 'block';
    var content = "";
    content += "<h1>" + film.title + "</h1>";
    if (film.photos[0] != undefined)
        content += "<img width=\"200\" height=\"289\" src=\"" + getEncodedPhoto(film.photos[0].idc) + "\" />";
    content += "<p> Gatunek: " + film.genre.name + "</p>";
    content += "<p> Rok produkcji: " + film.production_year + "</p>";
    content += "<p> D&#322ugo&#347&#263: " + film.length + "</p>";
    content += "<p> Opis:<br> " + film.description + "</p>";
    content += "<div class=\"btn-group\" role=\"group\" style=\"float:right\">";
    content += "<a class=\"btn btn-secondary\" role=\"button\" href=\"javascript:void(0)\" onclick=\"closePopup();\">Przejd&#378 do rezerwacji</a>"
    content += "<a class=\"btn btn-secondary\" role=\"button\" href=\"javascript:void(0)\" onclick=\"closePopup();\">Zamknij</a></div>";
    content += "<div class=\"clearfix\"/>";
    document.getElementById("popupContent").innerHTML = content;
}

function closePopup() {
    document.getElementById("popupBox").style.display = 'none';
}

function createTable(films) {
    var table = document.getElementById("table"),
        tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.classList.add('table');
    tbl.classList.add('table-condensed');
    for (var i = 0; i < films.length; i += 3) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 3; j++) {
            var td = document.createElement('td');
            var link = document.createElement('a');
            link.onclick = (function() {
                var film = films[i + j];
                return function() {
                    popup(film);
                }
            })();
            if (films[i + j].photos[0] != undefined) {
                var imageContainer = document.createElement('div');
                showPhoto(films[i + j].photos[0].idc, imageContainer);
                link.appendChild(imageContainer);
            } else {
                link.appendChild(document.createTextNode("BRAK OBRAZKA! :("));
            }
            link.appendChild(document.createElement('br'));
            link.appendChild(document.createTextNode(films[i + j]["title"]));
            td.appendChild(link);
            tr.appendChild(td);
        }
        tbl.appendChild(tr);
    }
    table.appendChild(tbl);
}

function showPhoto(photoId, photoContainer) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4) {
            var photo = document.createElement('img');
            photo.width = 200;
            photo.height = 289;
            var image = "data:image/png;base64," + this.response;
            photo.setAttribute("src", image);
            photoContainer.appendChild(photo);
        }
    };
    http.open("GET", "/cinema/rest/photo/" + photoId, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}

function getEncodedPhoto(photoId) {
    var image = "";
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4)
            image = "data:image/png;base64," + this.response;
    };
    http.open("GET", "/cinema/rest/photo/" + photoId, false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    return image;
}
