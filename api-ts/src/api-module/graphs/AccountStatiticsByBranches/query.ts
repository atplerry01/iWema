import * as _ from 'lodash';
import { mysqlSanitizeInput } from '../../../db/dbUtil';

export const getAccountStatiticsByBranches_QUERY = (zoneCode, productType, level, scopeLevel) => {

    let code = "''";

    if (level === 'R') { code = scopeLevel.regioncode; 
    } else if (level === 'Z') { code = scopeLevel.zonecode; 
    } else if (level === 'B') { code = scopeLevel.branchcode; }

    productType =  mysqlSanitizeInput(productType);
    zoneCode =  mysqlSanitizeInput(zoneCode);

    const q = `CALL sp_acctstat_fourth_level_graph('${level}','${code}',${zoneCode},${productType})`;

 return q;     
};

