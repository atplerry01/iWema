  // mysql
  export const getMaturity_profile_QUERY = (days, branchCode, level, scopeLevel) => {

    // scopeLevel contains object of branchCode, RegionCode and ZoneCode
    // level contains either G, R, Z or B

    let code = '';

    if (level === 'R') {
        code = scopeLevel.regioncode;
    } else if (level === 'Z') {
        code = scopeLevel.zonecode;
    } else if (level === 'B') { code = scopeLevel.branchcode; }

    if (branchCode === 'ALL') {
        branchCode = "";
    }
    if (days === 'ALL') {
        days = "";
    }

    const q = `CALL sp_maturity_profile('${days}','${branchCode}','${level}','${code}')`;
    // console.log('q:', q);
    return q;
};
