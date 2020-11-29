import { getFirstTimeDebit_QUERY } from "./query";
import { checkAccess } from "../../../util/utility";
import { executeMySQL } from "../../../db/dbUtil";

     export const getFirstTimeDebit = async(branchCode, accessLevels, scopeLevel, redis: any) => {

        return new Promise(async (resolve, reject) => {

            // if (!branchCode) return reject({ err: null, message: 'Branch code is required' })

            checkAccess('First-Time Debit', accessLevels).then(async level => {

                const key = `firstTimeDebit${branchCode}${level}`;

                const getFromCatch = await redis.get(key);
                if (getFromCatch) {
                    console.log('from cache........');
                    const data = JSON.parse(getFromCatch);     
                    return resolve(data);
                }


                const q = getFirstTimeDebit_QUERY(branchCode, level, scopeLevel);

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
                return reject({
                    err: err,
                    message: "Access Denied. Unauthorized User"
                });
            });


        });
    };
