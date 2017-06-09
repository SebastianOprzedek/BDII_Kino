# BDII_Kino
Projekt z BDII - Kino

10.06 - dużo już działa :)

Po pullowaniu trzeba wgrać skrypt AKTUALIZUJ_BAZE.sql, odswieżyć projekt w eclipsie (ppm -> refresh) i przebudować projekt antem - plik build.xml, odpalić wildfly'a i wejść na http://localhost:8180/cinema/home

#####################

Co trzeba zrobić na poniedziałek:
- dodać seans (powiązania z salą i filmem)

#####################

Co trzeba zrobić w następnej kolejności:
- napisać pozostałe inserty
- rozbudowywać dalej - najlepiej ceny, cennik, typ biletu
- Sprawdzanie dat zeby koncowa nie byla wczesniej niz poczatkowa
- Lata przestepne

#####################

Instrukcja instalacji:

1. Pobieramy zipa z:
https://drive.google.com/open?id=0B81SOo6NYPIvLXQ3amRFVGxFVVU
do C:/BDII_Kino

2. Instalujemy bazę z oracle express edition i wgrywamy skrypt - wszystko wg instrukcje/oracle_express_edition.docx

3. Przebudowujemy projekt za pomocą anta (build.xml) w eclipsie

4. Odpadalamy start_server.bat i wchodzimy na http://localhost:8180/cinema/home

Powinno działać :)


dopisujcie co wam przyjdzie do glowy