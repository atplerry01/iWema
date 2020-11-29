import * as _ from 'lodash';
import { mysqlSanitizeInput } from '../../../db/dbUtil';

export const getBranchListByRegion_QUERY = (regioncode) => {
    regioncode = mysqlSanitizeInput(regioncode);

   return  `SELECT b.BranchCode branchcode, b.BranchName branch, b.ZoneCode zonecode 
   FROM Branches b JOIN Zones z ON b.ZoneCode=z.ZoneCode
   WHERE b.status='Y' AND z.RegionCode=${regioncode} ORDER BY b.BranchName`;
 };
