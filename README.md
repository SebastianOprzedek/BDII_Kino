# BDII_Kino
Projekt z BDII - Kino

13.06 - dużo już działa :)

Po pullowaniu trzeba wgrać skrypt AKTUALIZUJ_BAZE.sql, odswieżyć projekt w eclipsie (ppm -> refresh) i przebudować projekt antem - plik build.xml, odpalić wildfly'a i wejść na http://localhost:8180/cinema/home

#####################

Co trzeba zrobić teraz:
- uzupełnić bazę realistycznimi danymi (najpierw dla tabelek, których używamy (sense, ceny, cennik))
- rozbudowywać dalej - sektor, miejsce, typ blietu, bilet
- potestować stronę na różne sposoby i pozabezpieczać przez błędami (np walidacja długości filmu, zeby ktos nie podał stringa)
- Lata przestepne

#####################

Co trzeba zrobić później:
- mamy konsole administratora, ale trzeba jeszcze robic normalnego uzytkownika kina

#####################

Instrukcja instalacji:

1. Pobieramy zipa z:
https://drive.google.com/open?id=0B81SOo6NYPIvLXQ3amRFVGxFVVU
do C:/BDII_Kino

2. Instalujemy bazę z oracle express edition i wgrywamy skrypt - wszystko wg instrukcje/oracle_express_edition.docx

3. Wgrywamy skrypty do bazy. Najpierw create_tables.sql potem AKTUALIZUJ_BAZE.sql

4. Przebudowujemy projekt za pomocą anta (build.xml) w eclipsie

5. Odpadalamy start_server.bat i wchodzimy na http://localhost:8180/cinema/home

Powinno działać :)
