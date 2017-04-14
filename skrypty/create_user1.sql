CREATE USER user1
IDENTIFIED by Haslo123;   
grant all PRIVILEGES to user1 WITH ADMIN OPTION; 
ALTER SESSION SET CURRENT_SCHEMA = user1;
CREATE TABLE CAR (
   idc      NUMBER(5) PRIMARY KEY,
   make     VARCHAR2(20),
   model    VARCHAR2(20),
   regNum   VARCHAR2(20),
   price    NUMBER(6,2)
);
Commit;