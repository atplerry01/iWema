import { mysqlSanitizeInput } from '../../../db/dbUtil';

export const getAccountStatiticsByZones_QUERY = (regionCode, productType, level, scopeLevel) => {

    let code = "''";

    if (level === 'R') { code = scopeLevel.regioncode; 
    } else if (level === 'Z') { code = scopeLevel.zonecode; 
    } else if (level === 'B') { code = scopeLevel.branchcode; }

    productType =  mysqlSanitizeInput(productType);
    regionCode =  mysqlSanitizeInput(regionCode);

    const q = `CALL sp_acctstat_third_level_graph('${level}','${code}',${regionCode},${productType})`;

 return q;     
};
