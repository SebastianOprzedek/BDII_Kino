# BDII_Kino
Projekt z BDII - Kino

Na ten moment(15.04) jest projekt z take ze zmienioną nazwą i połączeniem z bazą. Taki szablonik na którym możemy budować nasz program :)

Zadania do zrobienia przed spotkaniem z gościem:
- wygenerować skrypt z naszą bazą (tutaj potrzebny jest SQL developer - opis jak jest w instrukcje/sql_developer.docx)
- przerobić projekt tak, żeby klasy odpowiadały tym z wygenerowanego skryptu
- zrobić prostego klienta, najlepiej coś co używało by RESTa w javascripcie lub czymś podobym, żeby można było korzystać za pomocą przeglądarki, bo nie wyobrażam sobie desktopowego klienta systemu rezerwacji kina :P

Co będzie potrzebne, aby to odpalić:
- baza oracle - instrukcje/oracle_express_edition.docx
- projekt z take - http://zti.polsl.pl/images/przedmioty/take/take.zip
- SQL Developer - obowiązkowy tylko do stworzenia skryptów, reszta osób nie musi go mieć

Jak to poskładać do kupy:
Pobierzcie sobie to repo i projekt z take do C:\BDII_Kino. (możecie gdzie indziej, ale tak ustawiłem ścieżki do budowania projektu)
Folder workspace z take możecie cakowicie olać i zostawić tylko ten z repo.
Folder wildfly weźcie z take, ale tak, żeby poniższe pliki były z repo:
wildfly-10.1.0.Final\standalone\configuration\standalone.xml
wildfly-10.1.0.Final\standalone\configuration\mgmt-users.properties
wildfly-10.1.0.Final\modules\system\layers\base\com\oracle\* 
Jakby co to w instrukcjach jest info co dokładnie jest zmeiniane w tych plikach, więc mozna to zrobić ręcznie.

Odpalamy tak samo jak take, czyli póki co można testować czy działa za pomocą tamtego clienta.
