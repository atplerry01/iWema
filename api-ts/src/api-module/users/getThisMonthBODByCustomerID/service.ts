import { executeFinacleDRQuery } from "../../../db/dbUtil";
import { getThisMonthCustomerBirthdayByCustomerID_QUERY } from "./query";

export const getThisMonthCustomerBirthdayByCustomerID = customerid => {

    return new Promise((resolve, reject) => {

        if (!customerid) {
            return reject({ err: null, message: 'Customer ID is required!' });
        }

        const q = getThisMonthCustomerBirthdayByCustomerID_QUERY(customerid);

        executeFinacleDRQuery(q).then(result => {
            return resolve(result[0]);
        }).catch((err) => {
            return reject({ err: err, message: "Could not check customer's birthday" });
        });

    });
};
