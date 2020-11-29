import { executeMySQL } from "../../../db/dbUtil";
import { getTotalEmpGrade_QUERY } from "./query";

export const getTotalEmpGrade = () => {

    return new Promise((resolve, reject) => {

        const query = getTotalEmpGrade_QUERY();

        executeMySQL(query).then(result => {
            return resolve(result);
        }).catch((err) => {
            return reject({ err: err, message: "Could not retrieve grades" });
        }); // end of execution

    });
};
