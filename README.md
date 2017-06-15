# BDII_Kino
Projekt z BDII - Kino

14.06 - dużo już działa :)

Po pullowaniu trzeba wgrać skrypt STWÓRZ_LUB_ZAKTUALIZUJ_BAZE.sql, odswieżyć projekt w eclipsie (ppm -> refresh) i przebudować projekt antem - plik build.xml, odpalić wildfly'a i wejść na http://localhost:8180/cinema/home

#####################

Co trzeba zrobić teraz:
- uzupełnić bazę realistycznimi danymi zostały: typy biletów, bilety, miejsca. Ceny, cennik i sektory powinny być w porządku, ale można coś dodać
- rozbudowywać dalej - typ blietu, miejsce, bilet
- potestować stronę na różne sposoby i pozabezpieczać przez błędami (np walidacja długości filmu, zeby ktos nie podał stringa)
- Lata przestepne
- Przerobić wszystko na jeden język, bo teraz połowa jest po polsku a połowa po angielsku :P

#####################

Co trzeba zrobić później:
- mamy konsole administratora, ale trzeba jeszcze robic normalnego uzytkownika kina

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

tak
