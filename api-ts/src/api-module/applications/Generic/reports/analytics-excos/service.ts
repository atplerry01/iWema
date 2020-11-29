import { getConnection } from 'typeorm';

export const getAnalyticExcoService = async (email): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {

            let q = `SELECT * FROM wema360.analytics_exco where email = '${email}'`;

            // tslint:disable-next-line: max-line-length
            const returnLists = await getConnection().query(q);

            return resolve(returnLists);
        } catch (err) {
            return reject({ err, message: "No favourite link found" });
        }
    });
};

export const getAnalyticPageService = async (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {

            let q = `SELECT * FROM wema360.analytics_exco_pages where page_name = 'Wema Analytics'`;

            // tslint:disable-next-line: max-line-length
            const returnLists = await getConnection().query(q);

            return resolve(returnLists);
        } catch (err) {
            return reject({ err, message: "No favourite link found" });
        }
    });
};