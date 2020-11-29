import { mysqlSanitizeInput } from "../../../../../db/dbUtil";

    export const get_obsoletecar_bidreport_QUERY = (id: number) => {
        id = mysqlSanitizeInput(id); 
        return  `SELECT a.created, a.email,a.staffId,a.obsoleteCarId,a.amount,a.totalbid,a.staffname,
        a.grade,a.branchDept, b.brand,b.type,b.regno,b.lotno,b.location,b.baseprice 
        FROM bidders a, obsoletcars b where b.id=a.obsoleteCarId and a.obsoleteCarId = ${id}`;
    };
