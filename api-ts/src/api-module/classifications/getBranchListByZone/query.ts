import * as _ from 'lodash';
import { mysqlSanitizeInput } from '../../../db/dbUtil';

export const getBranchListByZone_QUERY = (zonecode) => {

    zonecode = mysqlSanitizeInput(zonecode);

   return  `SELECT BranchCode branchcode, BranchName branch, ZoneCode zonecode FROM Branches 
                       WHERE status='Y' AND ZoneCode=${zonecode} ORDER BY BranchName`;
 };
