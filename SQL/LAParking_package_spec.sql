create or replace NONEDITIONABLE PACKAGE LAPARKING
AS
TYPE r_status is Record (
  eventtime DATE,
  occupancystate VARCHAR2(10),
  spaceid VARCHAR2(10)
  );
TYPE inputStatus is table of r_status INDEX BY SIMPLE_INTEGER;

PROCEDURE insertStatus(
  eventtime  IN Status.eventtime%TYPE,
  occupancystate IN Status.occupancystate%TYPE,
  spaceid IN Status.spaceid%TYPE,
  result_message OUT VARCHAR2
);

PROCEDURE insertStatus_table(
  status_record inputStatus
);

END LAPARKING;
