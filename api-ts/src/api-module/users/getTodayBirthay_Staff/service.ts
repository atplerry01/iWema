import { executeSQLServer } from "../../../db/dbUtil";
import { getTodayBirthay_Staff_QUERY } from "./query";

export const getTodayBirthay_Staff = () => {

    return new Promise((resolve, reject) => {

        const q = getTodayBirthay_Staff_QUERY();

        // connect to Xceed
        executeSQLServer(q).then(result => {
            return resolve(result);
        }).catch((err) => {
            return reject({ err: err, message: "No user found" });
        }); // end of execution

    });
};
