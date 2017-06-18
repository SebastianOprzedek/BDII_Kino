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
    var e = document.getElementById("popupBox");
        e.style.display = 'block';

    var content = "";

    content += "<h1>" + film.title + "</h1>";
    content += "<p> Gatunek: " + film.genre.name + "</p>";
    content += "<p> Rok produkcji: " + film.production_year + "</p>";
    content += "<p> Długość: " + film.length + "</p>";
    content += "<p> Opis:<br> " + film.description + "</p>";
    content += "<div class=\"btn-group\" role=\"group\" style=\"float:right\">";
    content += "<a class=\"btn btn-secondary\" role=\"button\" href=\"javascript:void(0)\" onclick=\"closePopup();\">Przejdź do rezerwacji</a>"
    content += "<a class=\"btn btn-secondary\" role=\"button\" href=\"javascript:void(0)\" onclick=\"closePopup();\">Zamknij</a></div>";
    content += "<div class=\"clearfix\"/>";
    document.getElementById("popupContent").innerHTML = content;



}

function closePopup() {
    var e = document.getElementById("popupBox");
  //  if(e.style.display == 'block')
        e.style.display = 'none';
   // else
   //     e.style.display = 'block';
}

function createTable(films) {
    var table = document.getElementById("table"),
        tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.classList.add('table');
    tbl.classList.add('table-condensed');
    // console.log(films.length);
    for (var i = 0; i < films.length; i += 3) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 3; j++) {
            var td = document.createElement('td');
            var link = document.createElement('a');
            link.onclick = (function () {
                var film = films[i + j];
                return function () {
                    popup(film);
                }
            })();
            // console.log(films[i + j].photos);
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
        //   console.log(i);
        //   console.log(tr);
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
