import { getConnection } from 'typeorm';

export const getHQDivisionService = async (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {

            let q = `SELECT  DISTINCT Division FROM wema360.ExpenseAlertMISCode`;

            // tslint:disable-next-line: max-line-length
            const returnLists = await getConnection().query(q);
            return resolve(returnLists);
        } catch (err) {
            return reject({ err, message: "No favourite link found" });
        }
    });
};

export const getHQDivisionUnitService = async (division): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {

            let q = `SELECT  Ref_Code, Ref_Desc FROM ExpenseAlertMISCode WHERE Division = '${division}'`;

            // tslint:disable-next-line: max-line-length
            const returnLists = await getConnection().query(q);
            return resolve(returnLists);
        } catch (err) {
            return reject({ err, message: "No favourite link found" });
        }
    });
};

export const getHQExpenseAlertService = async (reportCode, startDate, endDate): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {

            let q = '';

            if (startDate === '') {
                q = `SELECT * FROM wema360.FinconExpenseAlert where InitiatingBr = '999' 
                and ReportCode = '${reportCode}'`;
            } else {
                q = `SELECT * FROM wema360.FinconExpenseAlert where InitiatingBr = '999' 
                and ReportCode = '${reportCode}' and TranDate BETWEEN '${startDate} 00:00:00.0' and  '${endDate} 00:00:00.0'`;
            }

            const returnLists = await getConnection().query(q);
            return resolve(returnLists);
        } catch (err) {
            return reject({ err, message: "No favourite link found" });
        }
    });
};
