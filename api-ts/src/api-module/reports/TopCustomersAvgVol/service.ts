import { checkAccess, Paginator } from "../../../util/utility";
import { getTopCustomersAvgVol_QUERY } from "./query";
import { executeFinacleDRQuery } from "../../../db/dbUtil";

export const getTopCustomersAvgVol = async(dateFrom, dateTo, accessLevels, scopeLevel, redis: any,  page = 1, per_page = 100, _export = null) => {

    return new Promise(async (resolve, reject) => {

        if (!dateFrom || !dateTo) {
            return reject({
                err: null,
                message: 'Please select Report type and Date'
            });
        }

            // todo: change the Top Customer to the right access
            const level = await checkAccess('Top Customers', accessLevels);
            if (!level) {
                return reject({
                    err: "",
                    message: "Access Denied. Unauthorized User"
                });
            }

            const key = `topcusttdavgvol${dateFrom}${dateTo}${level}`;

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

            getTopCustomersAvgVol_QUERY(dateFrom, dateTo, level, scopeLevel).then(q => {
               //  console.log('q.....:', q);
                executeFinacleDRQuery(q).then(async (result: any[]) => {

                    if (result && result.length) {
                        try {
                            await redis.set(key, JSON.stringify(result), "ex", parseInt(process.env.REPORT_EXP_DURATION as string, 10));
                            console.log('Redis Insert Okay');

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
