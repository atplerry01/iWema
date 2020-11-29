import { checkAccess } from "../../../../util/utility";
import { executeMySQL } from "../../../../db/dbUtil";
import { getAccountProfitability_QUERY } from "./query";

export const getAccountProfitability = async (staffId: string, searchterm, type, value, monthFrom: number, monthTo: number, accessLevels, scopeLevel, redis: any) => {

    return new Promise(async (resolve, reject) => {

        // consolidated is 2 which does not require any value
        if (!searchterm || (searchterm !== '2' && !value) || !monthFrom || monthFrom > monthTo) {
            return reject({
                err: null,
                message: 'Provide valid report parameters'
            });
        }


        checkAccess('Account Profitability', accessLevels).then(async level => {

            const key = `accProfitability${staffId}${searchterm}${type}${value}${monthFrom}${monthTo}${level}`;
            const getFromCatch = await redis.get(key);
            if (getFromCatch) {
                const data = JSON.parse(getFromCatch);      
                return resolve(data);
            }

            getAccountProfitability_QUERY(staffId, searchterm, type, value, monthFrom, monthTo, level, scopeLevel).then(q => {
                //   console.log('q:', q);
                executeMySQL(q).then(async (result: any[]) => {
                    if (result.length) {
                        try {
                           
                            const duration = parseInt(process.env.REPORT_EXP_DURATION as string, 10);
                            await redis.set(key, JSON.stringify(result), "ex",  duration);

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
                // console.log('err:', err);
                return reject(err);
            });


        }).catch(err => {
            return reject({
                err: err,
                message: "Access Denied. Unauthorized User"
            });
        });



    });
};
