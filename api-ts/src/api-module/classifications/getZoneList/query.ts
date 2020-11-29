export const getZoneList_QUERY = () => {
    return  `SELECT ZoneCode zonecode, ZoneName name, RegionCode regioncode FROM Zones ORDER BY ZoneName`;
  };
