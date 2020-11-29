import * as _ from 'lodash';
import { mysqlSanitizeInput } from '../../../db/dbUtil';


export const getAccountStatiticsByRegion_QUERY = (productType, level, scopeLevel) => {
    // scopeLevel contains object of branchCode, RegionCode and ZoneCode
// level contains either G, R, Z or B

                      let code = "''";

           if (level === 'R') { code = scopeLevel.regioncode; 
           } else if (level === 'Z') { code = scopeLevel.zonecode; 
           } else if (level === 'B') { code = scopeLevel.branchcode; }

           productType =  mysqlSanitizeInput(productType);

          const q =  `CALL sp_acctstat_second_level_graph('${level}','${code}',${productType})`;
         
       return q;   
};
