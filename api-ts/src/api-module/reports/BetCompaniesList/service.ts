import { get_betCompaniesList_QUERY } from "./query";
import { executeMySQL } from "../../../db/dbUtil";

export const get_betCompaniesList = async (_accessLevels) => {

    return new Promise(async (resolve, reject) => {

        try {
            const q = get_betCompaniesList_QUERY();
            const betCompaniesList = await executeMySQL(q);
            const result = {betCompaniesList};
            return resolve(result);
        } catch (err) {
            return reject({
                err: err,
                message: "BetCompanies List Retrieval Failed"
            });
        }

    });
};
