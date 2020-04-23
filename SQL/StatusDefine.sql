DROP TABLE Status CASCADE CONSTRAINTS;
CREATE TABLE Status(
  eventtime DATE,
  occupancystate VARCHAR2(10),
  spaceid VARCHAR2(10)
);
