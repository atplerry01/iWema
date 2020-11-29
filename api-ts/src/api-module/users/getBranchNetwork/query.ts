export const getBranchNetwork_QUERY = (drilldownLevel, code) => {

    let q;
    switch (drilldownLevel) {
        case 'Z':
            q = `SELECT z.ZoneName,z.ZoneCode,
                (select COUNT(*) FROM Branches b WHERE b.ZoneCode=z.ZoneCode) TotalBranches
                FROM Zones z WHERE z.Status='Y' AND z.RegionCode=${code} ORDER BY z.ZoneName;`;
            break;
        case 'B':
            q = `SELECT BranchCode, BranchName, Address, State, LineNumber FROM Branches
            WHERE Status='Y' AND ZoneCode=${code};`;
            break;
        default:
            q = `SELECT r.RegionName,r.RegionCode, (select COUNT(*) TotalZones FROM Zones z WHERE r.RegionCode=z.RegionCode) TotalZones,
            (select COUNT(*) FROM Branches b WHERE b.ZoneCode=(select z.ZoneCode FROM Zones z 
                WHERE r.RegionCode=z.RegionCode AND b.ZoneCode=z.ZoneCode)) TotalBranches
           FROM Region r WHERE r.Status='Y' ORDER BY r.RegionName;`;

    }

    return q;
};
