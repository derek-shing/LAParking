<<<<<<< HEAD
set SERVEROUTPUT on;

DECLARE
    --2015/05/15 8:30:25
    timeInString VARCHAR2(100) :='2020/05/15 8:30:25';
    arg Date := TO_DATE(timeInString, 'YYYY/MM/DD HH24:MI:SS');
    t status.eventtime%TYPE default arg;
    s status.occupancystate%TYPE default 'OCCUPIED';
    i status.spaceid%type default 'hello';
    re VARCHAR2(1000) :='';
    TYPE inputData IS TABLE OF status%ROWTYPE
      INDEX BY PLS_INTEGER;
    testInput inputData;
BEGIN
insertstatus(timeinstring,s,i,re);
DBMS_output.PUT_LINE('HELLO ' ||re);

=======
set SERVEROUTPUT on;

DECLARE
    --2015/05/15 8:30:25
    timeInString VARCHAR2(100) :='2020/05/15 8:30:25';
    arg Date := TO_DATE(timeInString, 'YYYY/MM/DD HH24:MI:SS');
    t status.eventtime%TYPE default arg;
    s status.occupancystate%TYPE default 'OCCUPIED';
    i status.spaceid%type default 'hello';
    re VARCHAR2(1000) :='';
    TYPE inputData IS TABLE OF status%ROWTYPE
      INDEX BY PLS_INTEGER;
    testInput inputData;
BEGIN
insertstatus(timeinstring,s,i,re);
DBMS_output.PUT_LINE('HELLO ' ||re);

>>>>>>> d01612cfc492baf620e4bee5f780b521ed926fe7
END;