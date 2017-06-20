var showId;

document.addEventListener("DOMContentLoaded", function(event) {
    updateTable();
    document.getElementById("addShow").style.display = "none";
    document.getElementById("updateShow").style.display = "none";
});

function checkAddDate() {
	
	//kompletnosc danych
    if ($('#addShowName').val() == '' || $('#addFilmName').val() == '' || $('#addYear').val() == '' || $('#addMonth').val() == '' || $('#addDay').val() == '' || $('#addHour').val() == '' ||  $('#addMinute').val() == ''){
		alert("Dane niekompletne");
		return false;
    }
	
	//sprawdzenie ilosci dni lutego
	//czy wybrano luty
	if($('#addMonth').val() == '1'){
		//czy rok jest przestepny
		if((($('#addYear').val() % 4 == 0) && ($('#addYear').val() % 100 != 0)) || ($('#addYear').val() % 400 == 0)){
			//czy dzien jest wiekszy niz 29
			if($('#addDay').val() > 29){
				alert("Luty w latach przestepnych ma maksymalnie 29 dni");
				return false;
			}
		}
		else if($('#addDay').val() > 28){
			alert("Luty w latach nieprzestepnych ma maksymalnie 28 dni");
			return false;
		}
	}
	
	//sprawdzenie ilosci dni styczen-lipiec
	//czy wybrano styczen-lipiec
	if(($('#addMonth').val() >= 0) && ($('#addMonth').val() <= 6)){
		//czy wybrano kwiecien/czerwiec
		if(($('#addMonth').val() % 2 == 1) && ($('#addMonth').val() != 1)){
			//czy dzien jest wiekszy niz 30
			if($('#addDay').val() > 30){
				alert("Wybrany miesiac ma maksymalnie 30 dni");
				return false;
			}
		}
		//jezeli tu wejdzie wybrano styczen/marzec/maj/lipiec
		else{
			//czy dzien jest wiekszy niz 31
			if($('#addDay').val() > 31){
				if(correctFormat){
					alert("Wybrany miesiac ma maksymalnie 31 dni");
				}				
				return false;
			}
		}
	}
	
	//sprawdzenie ilosci dni sierpien-grudzien
	//czy wybrano sierpien-grudzien
	if(($('#addMonth').val() >= 7) && ($('#addMonth').val() <= 11)){
		//czy wybrano wrzesien/listopad
		if(($('#addMonth').val() % 2 == 0)){
			//czy dzien jest wiekszy niz 30
			if($('#addDay').val() > 30){
				alert("Wybrany miesiac maksymalnie 30 dni");
				return false;
			}
		}
		//jezeli tu wejdzie wybrano sierpien/pazdziernik/grudzien
		else{
			//czy dzien jest wiekszy niz 31
			if($('#addDay').val() > 31){
				alert("Wybrany miesiac ma maksymalnie 31 dni");				
				return false;
			}
		}
	}
	
	return true;
}

function checkUpdateDate() {
	
	//kompletnosc danych
    if ($('#updateShowName').val() == '' || $('#updateFilmName').val() == '' || $('#updateYear').val() == '' || $('#updateMonth').val() == '' || $('#updateDay').val() == '' || $('#updateHour').val() == '' ||  $('#updateMinute').val() == ''){
		alert("Dane niekompletne");
		return false;
    }
	
	//sprawdzenie ilosci dni lutego
	//czy wybrano luty
	if($('#updateMonth').val() == '1'){
		//czy rok jest przestepny
		if((($('#updateYear').val() % 4 == 0) && ($('#updateYear').val() % 100 != 0)) || ($('#updateYear').val() % 400 == 0)){
			//czy dzien jest wiekszy niz 29
			if($('#updateDay').val() > 29){
				alert("Luty w latach przestepnych ma maksymalnie 29 dni");
				return false;
			}
		}
		else if($('#updateDay').val() > 28){
			alert("Luty w latach nieprzestepnych ma maksymalnie 28 dni");
			return false;
		}
	}
	
	//sprawdzenie ilosci dni styczen-lipiec
	//czy wybrano styczen-lipiec
	if(($('#updateMonth').val() >= 0) && ($('#updateMonth').val() <= 6)){
		//czy wybrano kwiecien/czerwiec
		if(($('#updateMonth').val() % 2 == 1) && ($('#updateMonth').val() != 1)){
			//czy dzien jest wiekszy niz 30
			if($('#updateDay').val() > 30){
				alert("Wybrany miesiac ma maksymalnie 30 dni");
				return false;
			}
		}
		//jezeli tu wejdzie wybrano styczen/marzec/maj/lipiec
		else{
			//czy dzien jest wiekszy niz 31
			if($('#updateDay').val() > 31){
				if(correctFormat){
					alert("Wybrany miesiac ma maksymalnie 31 dni");
				}				
				return false;
			}
		}
	}
	
	//sprawdzenie ilosci dni sierpien-grudzien
	//czy wybrano sierpien-grudzien
	if(($('#updateMonth').val() >= 7) && ($('#updateMonth').val() <= 11)){
		//czy wybrano wrzesien/listopad
		if(($('#updateMonth').val() % 2 == 0)){
			//czy dzien jest wiekszy niz 30
			if($('#updateDay').val() > 30){
				alert("Wybrany miesiac maksymalnie 30 dni");
				return false;
			}
		}
		//jezeli tu wejdzie wybrano sierpien/pazdziernik/grudzien
		else{
			//czy dzien jest wiekszy niz 31
			if($('#updateDay').val() > 31){
				alert("Wybrany miesiac ma maksymalnie 31 dni");				
				return false;
			}
		}
	}
	
	return true;
}

function addShow() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        updateTable();
    };
    http.open("POST", "/cinema/rest/show", true);
    http.setRequestHeader("Content-Type", "application/json");
    var show = new Object();
	var correctFormat = checkAddDate();
	
    if(correctFormat){
        show.data = new Date(document.getElementById("addYear").value, document.getElementById("addMonth").value, document.getElementById("addDay").value, document.getElementById("addHour").value,document.getElementById("addMinute").value,0);
        show.hall = hall($('#addHallName').val());
        show.film = film($('#addFilmName').val());
		alert("Dodano seans");
        http.send(JSON.stringify(show));
    }
}

function updateShow(id) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        updateTable();
    };
    http.open("PUT", "/cinema/rest/show/"+id, true);
    http.setRequestHeader("Content-Type", "application/json");
    var show = new Object();
	var correctFormat = checkUpdateDate();

    if(correctFormat){
        show.id = id;
        show.data = new Date(document.getElementById("updateYear").value, document.getElementById("updateMonth").value, document.getElementById("updateDay").value, document.getElementById("updateHour").value,document.getElementById("updateMinute").value,0);
        show.hall = hall($('#updateHallName').val());
        show.film = film($('#updateFilmName').val());
		alert("Zaktualizowano seans");
        http.send(JSON.stringify(show));
    }
}

function update(id){
	$('html, body').animate({ scrollTop: 0 }, 'fast');
    document.getElementById("addShow").style.display = "none";
    showId = id;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200)
        {
            document.getElementById("updateShow").style.display = "block";
            var show = JSON.parse(this.response);
            date = new Date(show.data);
            var year = date.getUTCFullYear();
            var month = date.getMonth() + 1;
   			var day = date.getDate();
		    var hours = date.getHours();
		    var minutes = date.getMinutes();
            showHallOptions(document.getElementById("updateHallName"));
            showFilmOptions(document.getElementById("updateFilmName"));
            document.getElementById("updateHallName").value = show.hall.name;
            document.getElementById("updateFilmName").value = show.film.title;
            document.getElementById("updateYear").value = year;
            document.getElementById("updateMonth").value = month;
            document.getElementById("updateDay").value = day;
            document.getElementById("updateHour").value = hours;
            document.getElementById("updateMinute").value = minutes;
        }
    };
    http.open("GET", "/cinema/rest/show/" + id, true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}

function showAddShow(){
    document.getElementById("addShow").style.display = "block";
    document.getElementById("updateShow").style.display = "none";
    showFilmOptions(document.getElementById("addFilmName"));
    showHallOptions(document.getElementById("addHallName"));
}

function updateTable() {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            var show = JSON.parse(this.response)["shows"];
            var rows = "";
            rows += "<tr>"+
                "<td><b>Data</b></td>"+
                "<td><b>Film</b></td>"+
                "<td><b>Sala</b></td>"+
                "<td><a href=\"javascript:showAddShow();\"><i class=\"fa fa-plus icons-margin\"></i></a></td>"+
                "</tr>";
            for(var i=0;i<show.length;i++){
                rows += "<tr><td>"+getFormattedDate(new Date(show[i]["data"]))+"</td><td>"+show[i]["film"]["title"]+"</td><td>"+show[i]["hall"]["name"]+"</td><td><a href=\"javascript:update("+show[i]["id"]+")\"><i class=\"fa fa-pencil icons-margin\"></i></a><a href=\"javascript:deleteById(" + show[i]["id"] + ");\"><i class=\"fa fa-trash icons-margin\"></i></a></td></tr>";
            }
            document.getElementById("table").innerHTML = "<table class=\"table table-condensed\" width=\"100%\">" + rows + "</table>";
        }
    };
    http.open("GET", "/cinema/rest/show", true);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
}

function deleteById(id) {
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 )
            updateTable();
    };
    http.open("DELETE", "/cinema/rest/show/" + id, true);
    http.send();
}

function film(filmName) {
    var film = -1;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var films = JSON.parse(this.response)["films"];
            for(var i=0;i<films.length;i++){
                if (films[i]["title"] == filmName)
                    film = films[i];
            }
        };
    }
    http.open("GET", "/cinema/rest/film", false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    return film;
}


function hall(hallName) {
    var hall = -1;
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var halls = JSON.parse(this.response)["halls"];
            for(var i=0;i<halls.length;i++){
                if (halls[i]["name"] == hallName)
                    hall = halls[i];
            }
        };
    }
    http.open("GET", "/cinema/rest/hall", false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    return hall;
}

function showFilmOptions(filmsDocument) {
    var options = "";
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            films = JSON.parse(this.response)["films"];
            for(var i = 0; i < films.length; i++){
                options += '<option value="'+films[i]["title"]+'">'+films[i]["title"]+'</option>';
            }
        }
    };
    http.open("GET", "/cinema/rest/film", false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    filmsDocument.innerHTML = options;
}

function showHallOptions(hallsDocument) {
    var options = "";
    var http = new XMLHttpRequest();
    http.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200){
            halls = JSON.parse(this.response)["halls"];
            for(var i = 0; i < halls.length; i++){
                options += '<option value="'+halls[i]["name"]+'">'+halls[i]["name"]+'</option>';
            }
        }
    };
    http.open("GET", "/cinema/rest/hall", false);
    http.setRequestHeader("Content-type", "application/json");
    http.send();
    hallsDocument.innerHTML = options;
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
