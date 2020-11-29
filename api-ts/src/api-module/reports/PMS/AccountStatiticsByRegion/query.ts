
export const getAccountStatiticsByRegion_QUERY = (productCode, level, scopeLevel) => {
    // scopeLevel contains object of branchCode, RegionCode and ZoneCode
    // level contains either G, R, Z or B

    let code = "''";

    if (level === 'R') {
        code = scopeLevel.regioncode;
    } else if (level === 'Z') {
        code = scopeLevel.zonecode;
    } else if (level === 'B') { code = scopeLevel.branchcode; }

    const q = `CALL sp_acctstat_second_level('${level}','${code}','${productCode}')`;

    return q;
};
