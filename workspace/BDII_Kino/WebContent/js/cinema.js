document.addEventListener("DOMContentLoaded", function(event) {
    updateTable();
});

function updateTable() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var films = JSON.parse(this.response)["films"];
            var rows = "";
            rows += "<tr>";
            for (var i = 0; i < films.length; i++) {

                if ((i>0) && (i % 3 == 0))
                    rows += "</tr><tr>";
                rows += "<td>"+ films[i].photos[0]+ "<br>" + films[i]["title"] + "</td>";
            }
            rows+="</tr>";
            document.getElementById("table").innerHTML = "<table class=\"table table-condensed\" width=\"100%\">" + rows + "</table>";
        }
    };
    http.open("GET", "/cinema/rest/film", true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}