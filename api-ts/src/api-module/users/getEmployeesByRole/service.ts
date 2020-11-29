import { executeMySQL } from "../../../db/dbUtil";
import { getEmployeesByRole_QUERY } from "./query";

export const getEmployeesByRole = (roleid: string) => {

    return new Promise((resolve, reject) => {

        const query = getEmployeesByRole_QUERY(roleid);

        executeMySQL(query).then(result => {
            return resolve(result);
        }).catch((err) => {
            return reject({ err: err, message: "No user found" });
        }); // end of execution

    });
};
