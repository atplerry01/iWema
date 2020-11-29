import { checkAccess } from "../../../util/utility";
import { getRiskAssets_QUERY } from "./query";
import { executeMySQL } from "../../../db/dbUtil";

export const getRiskAssets = async (bankcode, classification, accessLevels, scopeLevel, redis: any) => {

    return new Promise(async (resolve, reject) => {

        if (!bankcode || !classification) {
            return reject({
                err: null,
                message: 'Both BankCode and Classifications are required'
            });
        }

        checkAccess('Risk Assets', accessLevels).then(async level => {

            const key = `riskAssets${bankcode}${classification}${level}`;

            const getFromCatch = await redis.get(key);
            if (getFromCatch) {
               // console.log('from cache........');
                const data = JSON.parse(getFromCatch);
                return resolve(data);
            }

            const q = getRiskAssets_QUERY(bankcode, classification, level, scopeLevel);

            executeMySQL(q).then(async (result: any[]) => {
                if (result && result.length) {
                    try {
                        await redis.set(key, JSON.stringify(result), "ex", parseInt(process.env.REPORT_EXP_DURATION as string, 10));
                        console.log('Redis Insert Okay');

                    } catch (error) {
                        console.log('Redis Insert failed:', error.message);
                    }
                }


                return resolve(result);
            }).catch((err) => {
                return reject({
                    err: err,
                    message: "Report not available for this search criteria"
                });
            }); // end of execution

        }).catch(err => {
            return reject({
                err: err,
                message: "Access Denied. Unauthorized User"
            });
        });

    });
};
