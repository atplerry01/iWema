import { executeMySQL } from "../db/dbUtil";

export const getMyBranchList = (accessLevel, code) => {

    return new Promise((resolve, reject) => {

        const q = getMyBranchList_QUERY(accessLevel, code);

        executeMySQL(q).then((result: any[]) => {
            if (!result.length) {
                return reject('No record found');
            }

            return resolve(result);
        }).catch((err) => {
            return reject(err);
        }); // end of execution
    });

};


const getMyBranchList_QUERY = (accessLevel, code) => {

    let query = `SELECT b.BranchCode branchcode 
                        FROM Branches b  
                        LEFT JOIN Zones z  ON b.ZoneCode=z.ZoneCode
                    WHERE b.status='Y'`;

    if (accessLevel === 'R') {
        query = `${query} and RegionCode='${code}'`;
    } else if (accessLevel === 'Z') {
        query = `${query} and b.ZoneCode='${code}'`;
    }

    return query;
};
