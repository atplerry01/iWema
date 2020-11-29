export const getAccountStatiticsByProducts_QUERY = (level, scopeLevel) => {
    // scopeLevel contains object of branchCode, RegionCode and ZoneCode
    // level contains either G, R, Z or B

    let code = '';

    if (level === 'R') {
        code = scopeLevel.regioncode;
    } else if (level === 'Z') {
        code = scopeLevel.zonecode;
    } else if (level === 'B') { code = scopeLevel.branchcode; }

    const q = `CALL sp_acctstat_first_level('${level}','${code}')`;

    // console.log('q:', q);
    return q;
};
