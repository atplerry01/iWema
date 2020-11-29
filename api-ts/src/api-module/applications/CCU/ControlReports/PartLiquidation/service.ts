import { getConnection } from 'typeorm';

export const getPartLiquidationService = async (startDate, endDate): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let q;

            if (startDate === null || startDate === '') {
                q = `SELECT a.*, count(b.ENTITYID) as No_Times_PartLiquidated from  wema360.FDPrincipalTBL
                a, wema360.FDPrePartLiquidationTBL b  where 
                a.ENTITYID = b.ENTITYID GROUP by a.ENTITYID order by a.id asc`;
            } else {
                q = `SELECT * FROM wema360.FDPrincipalTBL where deal_date between '${startDate}' and '${endDate}'`;
            }

            // tslint:disable-next-line: max-line-length
            const returnLists = await getConnection().query(q);
            return resolve(returnLists);
        } catch (err) {
            return reject({ err, message: "No favourite link found" });
        }
    });

    // try {
    //     let q = getExpenseAlertQuery(serviceType, startDate, endDate);

    //     if (serviceType === 'ByBranch') {
    //         q = q + `and dth_init_sol_id != '999'`;
    //     } else {
    //         q = q + `and dth_init_sol_id = '999'`;
    //     }

    //     console.log(q);
    //     const result = await executeFinacleLiveQuery(q);
    //     return result as any;
    // } catch (e) {
    //     return e;
    // }
};

export const getPartLiquidationLogsService = async (entityId, accountNo): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {

            const q = `SELECT * FROM FDPrePartLiquidationTBL where entityid = '${entityId}' and accountno = '${accountNo}' and Status = 'Part-Liquidation'`;

            const returnLists = await getConnection().query(q);
            return resolve(returnLists);
        } catch (err) {
            return reject({ err, message: "No favourite link found" });
        }
    });

};
