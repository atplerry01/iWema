import { executeFinacleLiveQuery } from "../../../db/dbUtil";
import { getStaffAccouthWithStaffId_QUERY } from "./query";

export const getStaffAccouthWithStaffId = (staffNo) => {

    return new Promise((resolve, reject) => {

        if (!staffNo) {
            return reject({ err: null, message: 'Employee number is required!' });
        }

        // staffNo = staffNo.substring(staffNo.length - 4);

        // if the first character does not start with 'S' then add 'S'
        if (staffNo.substring(0, 1) !== 'S') { staffNo = 'S' + staffNo; }

        const q = getStaffAccouthWithStaffId_QUERY(staffNo);

        executeFinacleLiveQuery(q).then((result: any[]) => {

            if (result.length) {
                //  this.staffOneAccount = this.staffOneAccount.set(staffNo, result[0]);

                return resolve(result[0]);
            }

            return resolve(result);
        }).catch((err) => {
            return reject({ err: err, message: "Could not retrieve staff account" });
        });

    });
};
