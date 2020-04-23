CREATE TABLE MeterInventory (
  SpaceID VARCHAR2(26),
  BlockFace VARCHAR2(100),
  MeterType VARCHAR2(26),
  RateType VARCHAR2(26),
  RateRange VARCHAR2(26),
  MeteredTimeLimit VARCHAR2(26),
  ParkingPolicy VARCHAR2(128),
  StreetCleaning VARCHAR2(26),
  LatLng VARCHAR2(100)
);

create view lastStatus(spaceid, last_update, occupancystate)
as
select s.spaceid, m.last_update, s.occupancystate
from status s inner join
(select spaceid, count(*) as freq, max(eventtime) as last_update from Status group by spaceid) m
on
s.spaceid =m.spaceid and s.eventtime=m.last_update
ORDER by m.last_update DESC;

create view lastDetail(spaceid, blockface, metertype,ratetype,raterange,meteredtimelimit,parkingpolicy, streetcleaning, latlng, last_update,occupancystate)
AS
select meterinventory.spaceid, meterinventory.blockface, meterinventory.metertype,meterinventory.ratetype,meterinventory.raterange,meterinventory.meteredtimelimit, meterinventory.parkingpolicy,meterinventory.streetcleaning,meterinventory.latlng, laststatus.last_update, laststatus.occupancystate
from meterinventory  inner join laststatus on meterInventory.spaceid = laststatus.spaceid;
