import { executeMySQL } from "../../../db/dbUtil";
import { getBranchNetwork_QUERY } from "./query";

export const getBranchNetwork = (drilldownLevel, code) => {

    return new Promise((resolve, reject) => {

        if (drilldownLevel && !code) {
            return reject({ err: null, message: "Invalid request" });
        }

        const query = getBranchNetwork_QUERY(drilldownLevel, code);

        executeMySQL(query).then(result => {
            return resolve(result);
        }).catch((err) => {
            return reject({ err: err, message: "Could not retrieve record" });
        }); // end of execution

    });
};
