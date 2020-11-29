import * as _ from 'lodash';
import { mysqlSanitizeInput } from '../../../db/dbUtil';

export const getZoneListByRegion_QUERY = (regioncode) => {
    regioncode = mysqlSanitizeInput(regioncode);
    
  return  `SELECT ZoneCode zonecode, ZoneName name, RegionCode regioncode FROM Zones 
          WHERE regioncode=${regioncode} ORDER BY ZoneName`;
};
