import { getMyScopeCodes_QUERY } from "./query";
import { executeMySQL } from "../../../db/dbUtil";

export const getMyScopeCodes = Email => {

    return new Promise((resolve, reject) => {

        const q = getMyScopeCodes_QUERY(Email);

        executeMySQL(q).then(result => {
            return resolve(result[0]);
        }).catch((err) => {
            return reject(err);
        }); // end of execution

    });

};
