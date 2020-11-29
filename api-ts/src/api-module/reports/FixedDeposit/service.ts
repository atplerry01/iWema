import { Paginator, checkAccess } from "../../../util/utility";
import { getFixedDeposit_QUERY } from "./query";
import { executeFinacleDRQuery } from "../../../db/dbUtil";

export const getFixedDeposit = async (startDate, endDate, accountNo, branchCode, accessLevels, scopeLevel, redis, page, per_page, _export) => {

    return new Promise(async (resolve, reject) => {
        
        if (!startDate || !startDate) {
            return reject({
                err: null,
                message: 'Please select Report type and Date'
            });
        }

            // todo: change the Top Customer to the right access
            const level = await checkAccess('Fixed Deposit', accessLevels);
            if (!level) {
                return reject({
                    err: "",
                    message: "Access Denied. Unauthorized User"
                });
            }

            const key = `getFixedDeposit${startDate}${endDate}${accountNo}${branchCode}${level}`;

            const getFromCatch = await redis.get(key);
            if (getFromCatch) {
                console.log('from cache........');
                const data = JSON.parse(getFromCatch);
               
                if (_export === '1') {
                    return resolve(data);
                }

                const res = await Paginator(data, page, per_page);
                return resolve(res);
            }

            getFixedDeposit_QUERY(startDate, endDate, accountNo, branchCode, level, scopeLevel).then(q => {
                 
                executeFinacleDRQuery(q).then(async (result: any[]) => {
                  
                    if (result && result.length) {
                        try {
                            await redis.set(key, JSON.stringify(result), "ex", parseInt(process.env.REPORT_EXP_DURATION as string, 10));
                         //   console.log('Redis Insert Okay');

                        } catch (error) {
                            console.log('Redis Insert failed:', error.message);
                        }
                    }

                    const res = await Paginator(result, page, per_page);
                    return resolve(res);
                }).catch(err => {
                    return reject({
                        err: err,
                        message: "Report not available for this search criteria"
                    });
                });

            }).catch(err => {

                return reject({
                    err: err,
                    message: "Something went wrong..."
                });
            });

    });
};
