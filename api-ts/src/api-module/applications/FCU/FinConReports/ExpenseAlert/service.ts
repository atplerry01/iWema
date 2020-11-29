import { getConnection } from 'typeorm';

export const getExpenseAlertService = async (serviceType, startDate, endDate): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {

            let q = `SELECT * FROM wema360.FinconExpenseAlert`;

            if (serviceType === 'ByBranch') {
                q = q + ` where InitiatingBr != '999' and TranDate between  '${startDate} 00:00:00.0' and  '${endDate} 00:00:00.0'`;
            } else {
                q = q + ` where InitiatingBr = '999' and TranDate between  '${startDate} 00:00:00.0' and  '${endDate} 00:00:00.0'`;
            }

            // tslint:disable-next-line: max-line-length
            const returnLists = await getConnection().query(q);
            return resolve(returnLists);
        } catch (err) {
            return reject({ err, message: "No favourite link found" });
        }
    });
};
