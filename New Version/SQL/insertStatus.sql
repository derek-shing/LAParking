create or replace NONEDITIONABLE PROCEDURE insertStatus(
  eventtime  IN Status.eventtime%TYPE,
  occupancystate IN Status.occupancystate%TYPE,
  spaceid IN Status.spaceid%TYPE,
  result_message OUT VARCHAR2
)

AS
--arg Status.eventtime%TYPE := TO_DATE(eventtime, 'YYYY/MM/DD HH24:MI:SS');
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