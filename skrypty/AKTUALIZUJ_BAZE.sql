DELETE FROM SEANS;
DELETE FROM FILM;
DELETE FROM ZDJECIA;
DELETE FROM GATUNEK;
DELETE FROM CENNIK;
DELETE FROM CENY;
DELETE FROM SALA;
DROP SEQUENCE GATUNEK_SEQ;
DROP SEQUENCE FILM_SEQ;
DROP SEQUENCE CENY_SEQ;
DROP SEQUENCE CENNIK_SEQ;
DROP SEQUENCE ZDJECIA_SEQ;
DROP SEQUENCE SALA_SEQ;
DROP SEQUENCE SEANS_SEQ;

CREATE SEQUENCE GATUNEK_SEQ
  START WITH 1
  INCREMENT BY 1
  CACHE 20;
  
CREATE OR REPLACE TRIGGER GATUNEK_SEQ_TRIGGER
  BEFORE INSERT ON GATUNEK
  FOR EACH ROW
BEGIN
  :new.id := GATUNEK_SEQ.nextval;
END;
/
CREATE SEQUENCE FILM_SEQ
  START WITH 1
  INCREMENT BY 1
  CACHE 20;
  
CREATE OR REPLACE TRIGGER FILM_SEQ_TRIGGER
  BEFORE INSERT ON FILM
  FOR EACH ROW
BEGIN
  :new.id := FILM_SEQ.nextval;
END;
/
CREATE SEQUENCE CENY_SEQ
  START WITH 1
  INCREMENT BY 1
  CACHE 20;
  
CREATE OR REPLACE TRIGGER CENY_SEQ_TRIGGER
  BEFORE INSERT ON CENY
  FOR EACH ROW
BEGIN
  :new.id := CENY_SEQ.nextval;
END;
/
CREATE SEQUENCE CENNIK_SEQ
  START WITH 1
  INCREMENT BY 1
  CACHE 20;
  
CREATE OR REPLACE TRIGGER CENNIK_SEQ_TRIGGER
  BEFORE INSERT ON CENNIK
  FOR EACH ROW
BEGIN
  :new.id := CENNIK_SEQ.nextval;
END;
/

CREATE SEQUENCE ZDJECIA_SEQ
  START WITH 1
  INCREMENT BY 1
  CACHE 20;
  
CREATE OR REPLACE TRIGGER ZDJECIA_SEQ_TRIGGER
  BEFORE INSERT ON ZDJECIA
  FOR EACH ROW
BEGIN
  :new.id := ZDJECIA_SEQ.nextval;
END;
/

CREATE SEQUENCE SALA_SEQ
  START WITH 1
  INCREMENT BY 1
  CACHE 20;
  
CREATE OR REPLACE TRIGGER SALA_SEQ_TRIGGER
  BEFORE INSERT ON SALA
  FOR EACH ROW
BEGIN
  :new.id := SALA_SEQ.nextval;
END;
/

CREATE SEQUENCE SEANS_SEQ
  START WITH 1
  INCREMENT BY 1
  CACHE 20;
  
CREATE OR REPLACE TRIGGER SEANS_SEQ_TRIGGER
  BEFORE INSERT ON SEANS
  FOR EACH ROW
BEGIN
  :new.id := SEANS_SEQ.nextval;
END;
/


INSERT INTO Gatunek (nazwa, opis) VALUES ('komedia', 'Wywoluje usmiech na twarzy widza');
INSERT INTO Gatunek (nazwa, opis) VALUES ('horror', 'Wywouje u widza klimat grozy, niepokoju i szoku');
INSERT INTO Gatunek (nazwa, opis) VALUES ('animacja', 'Film rysunkowy');
INSERT INTO Gatunek (nazwa, opis) VALUES('fantasy', 'Magia, fantastyczne stworzenia, swiaty nierzeczywiste');
INSERT INTO Gatunek (nazwa, opis) VALUES('dramat', 'Film wywouje u widza smutek lub melancholi�');
INSERT INTO Gatunek (nazwa, opis) VALUES('romans', 'Zawiera watek milosny');
INSERT INTO Gatunek (nazwa, opis) VALUES('sci-fi', 'Fantastyka naukowa');
INSERT INTO Gatunek (nazwa, opis) VALUES('kryminal', 'Porusza aspekty przetepczosci i wymiaru sprawiedliwosci');
INSERT INTO Gatunek (nazwa, opis) VALUES('przygodowy', 'Przedstawia przygody bohatera');
INSERT INTO Gatunek (nazwa, opis) VALUES('biograficzny', 'Film skoncentrowany na zyciu slawnych ludzi');

INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Historia zycia Forresta, chlopca o niskim ilorazie inteligencji z 
  niedowladem konczyn, ktory staje sie miliarderem i bohaterem wojny w 
  Wietnamie.', 'Forrest Gump', 1994, 142, 1);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Czterech przyjaciol spedza wieczor kawalerski w Las Vegas. Nastepnego
  dnia okazuje sie, ze zgubili pana mlodego i nic nie pamietaja.', 'Kac Vegas',
  2009, 90, 1);
  INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Rok 2044, zostaja odhibernowani dwaj ostatni przedstawiciele plci
  meskiej. Wlada jest w rekach Ligii Kobiet, ktora nie zamierza z niej 
  zrezygnowac.', 'Seksmisja', 1983, 116, 1);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Jack podejmuje prace stroza odcietego od swiata hotelu Overlook. 
  Wkrotce idylla zamienia sie w koszmar.', 'Lsnienie', 1980, 146, 2);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Slynna para badaczy zjawisk paranormalnych zostaje poproszona o pomoc
  rodzinie, ktora terroryzuje potezny demon.', 'Obecnosc', 2013, 112, 2);  
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Trojka studentow wyrusza z kamera w glab lasu w poszukiwaniu sladow 
  przerazajacej wiedzmy.', 'Blair Witch Project', 1999, 81, 2);  
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Targany nieslusznymi wyrzutami sumienia po smierci ojca maly lew 
  Simba skazuje sie na wygnanie rezygnujac z przynaleznego mu miejsca na czele 
  stada.', 'Krol Lew', 1994, 89, 3);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Zaklecie wrozki zamienia okrutnego ksiecia w przerazajaca Bestie. 
  Aby zdjac urok, Bestia musi zdobyc milosc pieknej Belli.', 'Piekna i Bestia',
  1991, 90, 3);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Aby ratowac ojca przed smiercia na wojnie, Mulan ucieka z domu i 
  przebrana za mezczyzne szkoli sie w armii.', 'Mulan', 1998, 86, 3); 
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Harry Potter musi wzi�� udzia w Turnieju Tr�jmagicznym, kiedy jego 
  nazwisko zostaje wybrane przez tajemnicza Czare Ognia.', 'Harry Potter i 
  Czara Ognia', 2005, 157, 4);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Dziewietnastoletnia Alicja wraca do krainy z dziecinstwa, gdzie 
  dowiaduje sie, ze jej przeznaczeniem jest zdetronizowac Krolowa Kier.', 
  'Alicja w Krainie Czarow', 2010, 108, 4);  
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Ubogi Charlie Bucket znajduje jeden z pieciu zlotych biletow, ktory
  umozliwia mu zwiedzenie ogromnej fabryki czekolady.', 'Charlie i fabryka 
  czekolady', 2005, 115, 4); 
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Emerytowany straznik wiezienny opowiada przyjaciolce o niezwyklym 
  mezczyznie, ktorego skazano na smierc za zabojstwo dwoch 9-letnich 
  dziewczynek.', 'Zielona mila', 1999, 188, 5);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Adaptacja opowiadania Stephena Kinga. Historia nieslusznie skazanego 
  na dozywocie bankiera, ktory musi przezyc w brutalnym swiecie rzadzonym przez 
  straznikow i wspolwiezniow', 'Skazani na Shawshank', 1994, 142, 5);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Platny morderca ratuje dwunastoletnia dziewczynke, ktorej rodzina 
  zostala zabita przez skorumpowanych policjantow.', 'Leon zawodowiec', 1994, 
  110, 5);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Cierpiaca na raka tarczycy Hazel za namowa rodzicow idzie na 
  spotkanie grupy wsparcia. Poznaje tam nastoletniego Gusa, bylego koszykarza z 
  amputowan� noga.' ,'Gwiazd naszych wina' , 2014, 125, 6);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Los Angeles. Pianista jazzowy zakochuje sie w poczatkujacej 
  aktorce.', 'La La Land', 2016, 126, 6); 
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Bella gotowa jest zamieszkac w zamku potwora, aby ratowac ojca. Z 
  czasem miedzy dziewczyna a bestia zaczyna rodzic sie uczucie. Jednoczesnie o 
  reke Belli zabiega przystojny mysliwy Gaston.', 'Piekna i Bestia', 2017, 129, 
  6); 
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Po nieudanej ekspedycji Mark zostaje sam na Marsie. Mimo znikomych 
  zapasow oraz zerwanej lacznosci z dowodztwem mezczyzna stara sie przetrwac w 
  trudnych warunkach.', 'Marsjanin', 2015, 141, 7);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Po serii ladowan Obcych na Ziemi wojsko werbuje ekspertke 
  lingwistyki, ktorej zadaniem jest odkrycie nastawienia przybyszy z kosmosu.', 
  'Nowy poczatek', 2016, 116, 7);  
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Historia grupy rebeliantow zjednoczonych w smialej misji polegajacej 
  na plan�w imperialnej Gwiazdy Smierci.', 'Lotr 1.', 
  2016, 133, 7);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Amerykanski agent specjalny pod przykrywk� skorumpowanego biznesmena 
  usiluje rozpracowac organizacje przestepcza Pablo Escobara.', 'Boss', 2016, 
  131, 8);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('W Sudetach dochodzi do serii morderstw, ktorych ofiarami s� mysliwi. 
  Wobec bezradno�ci policji �ledztwo rozpoczyna emerytowana in�ynierka', 
  'Pokot', 2017, 128, 8);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Dwoch policjantow stara sie zlapac seryjnego morderce wybierajacego 
  swoje ofiary wg specjalnego "klucza".', 'Siedem', 1995, 127, 8);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Christopher konczy studia, ale zamiast poswiecic sie karierze 
  zawodowej, wyrusza autostopem w kierunku Alaski.', 'Wszystko za zycie', 2007, 
  148, 9);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Druzyna Pierscienia zostaje rozbita, lecz zdesperowany Frodo za 
  wszelka cen� chce wype�nic powierzone mu zadanie.', 'Dwie wieze', 2002, 179, 
  9);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Aragorn jednoczy sily Srodziemia, szykujac sie do bitwy, ktora ma 
  odwrocic uwage Saurona od podazajacych w kierunku Gory Przeznaczenia 
  hobbit�w.', 'Powrot krola', 2003, 201, 9);   
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Podczas drugiej wojny swiatowej Wladys�aw Szpilman, znakomity polski 
  pianista, stara sie przezyc w okupowanej Warszawie.', 'Pianista', 2002, 120, 
  10);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Geniusz matematyczny John Nash za wszelka cene pragnie opracowac 
  teorie, dzieki ktorej zostanie cenionym naukowcem. Przeszkoda staje sie jego 
  stopniowo rozwijajaca choroba.', 'Piekny umysl', 2001, 135, 10);
INSERT INTO Film(opis, tytul, rok_produkcji, dlugosc, gatunek_id)
VALUES('Sparalizowany milioner zatrudnia do opieki mlodego chlopaka z 
  przedmiescia, ktory wlasnie wyszedl z wiezienia.', 'Nietykalni', 2011, 142, 
  10);

INSERT INTO Ceny(cena, od, DO) VALUES(20, '2017-05-20', '2017-06-03');
INSERT INTO Ceny(cena, od, DO) VALUES(18, '2017-05-20', '2017-06-03');
INSERT INTO Ceny(cena, od, DO) VALUES(22, '2017-06-04', '2017-06-11');
INSERT INTO Ceny(cena, od, DO) VALUES(20, '2017-06-04', '2017-06-11');
INSERT INTO Cennik(ceny_id) VALUES(1);
INSERT INTO Cennik(ceny_id) VALUES(2);
INSERT INTO Cennik(ceny_id) VALUES(3);
INSERT INTO Cennik(ceny_id) VALUES(4);
INSERT INTO SALA(NAZWA, SALA_ID) VALUES('SALA NIEBIESKA', 1);
INSERT INTO SALA(NAZWA, SALA_ID) VALUES('SALA �ӣTA', 2);
INSERT INTO SALA(NAZWA, SALA_ID) VALUES('SALA ZIELONA', 3);
INSERT INTO SALA(NAZWA, SALA_ID) VALUES('SALA CZERWONA', 4);
INSERT INTO SALA(NAZWA, SALA_ID) VALUES('SALA CZARNA', 5);

INSERT INTO SEANS(data, sala_id, film_id) VALUES('2017-05-20 16:30', 1, 1);
INSERT INTO SEANS(data, sala_id, film_id) VALUES('2017-05-20 16:00', 2, 2);
INSERT INTO SEANS(data, sala_id, film_id) VALUES('2017-05-20 18:15', 3, 3);

commit;