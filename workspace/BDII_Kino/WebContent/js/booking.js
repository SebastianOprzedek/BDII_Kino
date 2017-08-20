document.addEventListener("DOMContentLoaded", function(event) {
    var url = new URL(window.location.href);
    var id = url.searchParams.get("id");
    updateTable(id);
});

function updateTable(id) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.response);
            var shows = JSON.parse(this.response)["shows"];
            if (shows.length == 0)
                document.getElementById("table").innerHTML = "Lista seansów dla tego filmu jest pusta";
            else {
                document.getElementById("table").innerHTML = "Dost&#281pne id sensów: <br>";
                for (var i = 0; i < shows.length; i++) {
                    document.getElementById("table").innerHTML = document.getElementById("table").innerHTML + shows[i].id + "<br>";
                }
            }
        }
    };
    http.open("GET", "/cinema/rest/film/" + id + "/shows", true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}
