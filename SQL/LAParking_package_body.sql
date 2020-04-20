create or replace NONEDITIONABLE PACKAGE BODY LAPARKING AS



PROCEDURE insertStatus(
  eventtime  IN Status.eventtime%TYPE,
  occupancystate IN Status.occupancystate%TYPE,
  spaceid IN Status.spaceid%TYPE,
  result_message OUT VARCHAR2
)
AS

BEGIN

INSERT INTO Status
(
  eventtime,
  occupancystate,
  spaceid
)
VALUES
(
  --arg,
  eventtime,
  occupancystate,
  spaceid
);
result_message:='';
COMMIT;

END insertStatus;

PROCEDURE insertStatus_table(
  status_record inputStatus
) AS
r status%rowtype;
i Integer;
BEGIN
FOR i in status_record.First .. status_record.LAST LOOP
--dbms_output.put_line(status_record(i).spaceid);
INSERT INTO Status
(
  eventtime,
  occupancystate,
  spaceid
)
VALUES
(
  --arg,
  status_record(i).eventtime,
  status_record(i).occupancystate,
  status_record(i).spaceid
);
END LOOP;
commit;
END insertStatus_table;

END LAPARKING;
