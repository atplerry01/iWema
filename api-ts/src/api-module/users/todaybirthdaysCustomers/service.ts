import { executeFinacleDRQuery } from "../../../db/dbUtil";
import { getTodayBirthay_Customers_QUERY } from "./query";

export const getTodayBirthay_Customers = () => {

    return new Promise((resolve, reject) => {

        const q = getTodayBirthay_Customers_QUERY();

        executeFinacleDRQuery(q).then(result => {
            return resolve(result);
        }).catch((err) => {
            return reject({ err: err, message: "Could not retrieve customers' birthday" });
        });

    });
};
