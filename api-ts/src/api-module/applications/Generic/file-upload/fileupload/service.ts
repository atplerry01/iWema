import { getConnection } from "typeorm";

export const getProjectDetailService = async (code): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {

            let q = `SELECT * FROM wema360.FileUploadManager where ProjectName = '${code}';`;

            const returnLists = await getConnection().query(q);
            return resolve(returnLists);
        } catch (err) {
            return reject({ err, message: "No Project Found" });
        }
    });
};
