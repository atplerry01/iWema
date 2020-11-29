import { checkAccess } from "../../../util/utility";
import { getMaturity_profile_QUERY } from "./query";
import { executeMySQL } from "../../../db/dbUtil";

export const getMaturity_profile = async(days, branchCode, accessLevels, scopeLevel, redis) => {

    return new Promise(async (resolve, reject) => {

        if (!days || !branchCode) {
            return reject({
                err: null,
                message: 'Both BankCode and Classifications are required'
            });
        }

        checkAccess('Fixed Deposit - Maturity Profile', accessLevels).then(async level => {

            const key = `maturityprofile${days}${branchCode}${level}`;

            const getFromCatch = await redis.get(key);
            if (getFromCatch) {
                console.log('from cache........');
                const data = JSON.parse(getFromCatch);
                return resolve(data);
            }

            const q = getMaturity_profile_QUERY(days, branchCode, level, scopeLevel);

            executeMySQL(q).then(async result => {
                if (result[0] && result[0].length) {
                    try {
                        await redis.set(key, JSON.stringify(result[0]), "ex", parseInt(process.env.REPORT_EXP_DURATION as string, 10));
                        console.log('Redis Insert Okay');

                    } catch (error) {
                        console.log('Redis Insert failed:', error.message);
                    }
                }

                return resolve(result[0]);
            }).catch((err) => {
                return reject({
                    err: err,
                    message: "Report not available for this search criteria"
                });
            }); // end of execution

        }).catch(err => {
            // console.log( 'err:', err)
            return reject({
                err: err,
                message: "Access Denied. Unauthorized User"
            });
        });

    });
};
