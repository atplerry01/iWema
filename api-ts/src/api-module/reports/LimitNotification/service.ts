import { checkAccess, Paginator } from "../../../util/utility";
import { getLimitNotification_QUERY } from "./query";
import { executeSQLServer } from "../../../db/dbUtil";

     export const getLimitNotification = async(dateFrom, dateTo, accessLevels, redis: any,  page = 1, per_page = 100, _export = null) => {

        return new Promise(async (resolve, reject) => {

            if (!dateFrom || !dateTo) {
                return reject({
                    err: null,
                    message: 'Please select date range'
                });
            }


            const level = await checkAccess('Limit Notification', accessLevels);
            if (!level) {
                return reject({
                    err: "",
                    message: "Access Denied. Unauthorized User"
                });
            }

            const key = `LimitNotification${dateFrom}${dateTo}`;
            let getfromCatch = await redis.get(key);
            if (getfromCatch) {
                console.log('got from catch.....:');
                getfromCatch = await JSON.parse(getfromCatch);


                if (_export === '1') {
                    return resolve(getfromCatch);
                }

                const res = await Paginator(getfromCatch, page, per_page);

                return resolve(res);
            }


            const q = getLimitNotification_QUERY();
            const userInput = {
                'dateFrom': dateFrom,
                'dateTo': dateTo
            };
            
            executeSQLServer(q, userInput, 'easymoment').then(async (result: any[]) => {
                console.log('received response from SQL');

                if (result.length > 0) {

                    try {
                        await redis.set(key, JSON.stringify(result), "ex", 60 * 30); // store for 30 min
                        console.log('Redis Insert Okay');

                    } catch (error) {
                        console.log('Redis Insert failed:', error.message);
                    }

                    const res = await Paginator(result, page, per_page);

                    return resolve(res);
                } else {
                    return resolve(result);
                }

            }).catch(err => {
                return reject({
                    err: err,
                    message: "Report not available for this search criteria"
                });
            });
        });
    };
