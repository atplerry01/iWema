import { executeMySQL } from "../../../db/dbUtil";
import { searchEmployees_QUERY } from "./query";

export const searchEmployees = (searchterm, regioncode, zonecode, branchcode) => {

    return new Promise((resolve, reject) => {

        const query = searchEmployees_QUERY(searchterm, regioncode, zonecode, branchcode);

        executeMySQL(query).then(result => {
            return resolve(result);
        }).catch((err) => {
            return reject({ err: err, message: "No user found" });
        }); // end of execution

    });
};
