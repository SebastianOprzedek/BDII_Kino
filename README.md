# BDII_Kino
Projekt z BDII - Kino

07.05 - Odkasztaniłem front, działa dodawanie/przegladanie/usuwanie filmów i gatunków

Po pullowaniu trzeba przebudować projekt antem - plik build.xml, odpalić wildfly'a i wejść na http://localhost:8180/cinema/home

#####################

Co trzeba zrobić w następnej kolejności:
- sprawdzić bazę zgodnie z uwagami z maila
- napisać pozostałe inserty
- przerobić front na jakiś ładniejszy
- rozbudować projekt zgodnie z przypadkami użycia

#####################

Instrukcja instalacji:

1. Pobieramy zipa z:
https://drive.google.com/open?id=0B81SOo6NYPIvLXQ3amRFVGxFVVU
do C:/BDII_Kino

2. Instalujemy bazę z oracle express edition i wgrywamy skrypt - wszystko wg instrukcje/oracle_express_edition.docx

3. Przebudowujemy projekt za pomocą anta (build.xml) w eclipsie

4. Odpadalamy start_server.bat i wchodzimy na http://localhost:8180/cinema/home

Powinno działać :)




TODO:
Sprawdzanie dat zeby koncowa nie byla wczesniej niz poczatkowa
Lata przestepne
dopisujcie co wam przyjdzie do glowy