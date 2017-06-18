# BDII_Kino
Projekt z BDII - Kino

18.06 - prawie wszystko już działa :)

Po pullowaniu trzeba wgrać skrypt STWÓRZ_LUB_ZAKTUALIZUJ_BAZE.sql, odswieżyć projekt w eclipsie (ppm -> refresh) i przebudować projekt antem - plik build.xml, odpalić wildfly'a i wejść na http://localhost:8180/cinema/home

#####################

Co trzeba zrobić teraz:
- uzupełnić bazę realistycznimi danymi zostały: bilety
- rozbudowywać dalej - została zakładka bilet
- potestować stronę na różne sposoby i pozabezpieczać przez błędami (np walidacja długości filmu, zeby ktos nie podał stringa)
- Lata przestepne
- możliwość rezerwowania biletu kina na mainpage

#####################

Instrukcja instalacji:

1. Pobieramy zipa z:
https://drive.google.com/open?id=0B81SOo6NYPIvLXQ3amRFVGxFVVU
do C:/BDII_Kino

2. Instalujemy bazę z oracle express edition i wgrywamy skrypt - wszystko wg instrukcje/oracle_express_edition.docx

3. Wgrywamy skrypt do bazy - STWÓRZ_LUB_ZAKTUALIZUJ_BAZE.sql

4. Przebudowujemy projekt za pomocą anta (build.xml) w eclipsie

5. Odpadalamy start_server.bat i wchodzimy na http://localhost:8180/cinema/home

Powinno działać :)