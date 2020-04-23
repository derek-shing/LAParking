set SERVEROUTPUT on;

DECLARE
    --2015/05/15 8:30:25
    timeInString VARCHAR2(100) :='2020/05/15 8:30:25';
    arg Date := TO_DATE(timeInString, 'YYYY/MM/DD HH24:MI:SS');
    t status.eventtime%TYPE default arg;
    s status.occupancystate%TYPE default 'OCCUPIED';
    i status.spaceid%type default 'PACKAGE';
    re VARCHAR2(1000) :='';
    TYPE inputData IS TABLE OF status%ROWTYPE
      INDEX BY PLS_INTEGER;
    testInput laparking.inputStatus;
    r status%rowtype;
    it Integer:=1;
BEGIN
--laparking.insertstatus(t,s,i,re);
for r in (select * from status) loop
    testInput(it):=r;
    --DBMS_output.PUT_LINE('HELLO ' ||r.spaceid);
    it:=it +1;
end loop;


/*
--laparking.insertstatus_table(testInput);
FOR it IN testInput.FIRST .. testInput.LAST LOOP
    if testInput(it) not in (select * from status) then
      DBMS_output.PUT_LINE('New Record' || testInput(it).OCCUPANCYSTATE);
    else 
      DBMS_output.PUT_LINE('Duplited' || testInput(it).OCCUPANCYSTATE);
    end if;
END LOOP;
*/
select count(*) into it  from status where status.eventtime = testInput(1).eventtime And status.occupancystate = testInput(1).occupancystate and status.spaceid = testInput(1).spaceid;
DBMS_output.PUT_LINE('Duplited' || it);



END;