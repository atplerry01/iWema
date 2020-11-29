import { mysqlSanitizeInput } from "../../../db/dbUtil";

export const getMyScopeCodes_QUERY = Email => {

    Email = mysqlSanitizeInput(Email);

    return `SELECT b.BranchCode branchcode, b.ZoneCode zonecode,RegionCode regioncode 
                        FROM Branches b 
                        JOIN employee_master e 
                        ON b.BranchCode=e.BranchCode  
                        LEFT JOIN Zones z 
                        ON b.ZoneCode=z.ZoneCode
                    WHERE e.status='Y' AND e.Email = ${Email}`;
};
