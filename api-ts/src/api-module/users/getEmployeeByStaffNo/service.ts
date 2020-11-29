import { getEmployeeByStaffNo_QUERY } from "./query";
import { executeMySQL } from "../../../db/dbUtil";

export const getEmployeeByStaffNo = (staffNo) => {

    return new Promise((resolve, reject) => {

        if (!staffNo) {
            return reject({ err: null, message: 'Employee number is required!' });
        }


        staffNo = staffNo.substring(staffNo.length - 4);

        const query = getEmployeeByStaffNo_QUERY(staffNo);

        executeMySQL(query).then((result: any[]) => {

            if (!result.length) {
                return reject({ err: "No user found", message: "No user found" });
            }

            return resolve(result);

        }).catch((err) => {
            return reject({ err: err, message: "No user found" });
        }); // end of execution

    });
};
