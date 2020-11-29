import { checkAccess } from "../../../util/utility";
import { getTopCustomers_TD_CASA_QUERY } from "./query";
import { executeFinacleDRQuery } from "../../../db/dbUtil";

export const getTopCustomers_TD_CASA = async(reportType, selectedDate, branchCode, accessLevels, scopeLevel, redis: any) => {

    return new Promise(async (resolve, reject) => {

        if (!reportType || !selectedDate || !branchCode) {
            return reject({
                err: null,
                message: 'Please select Report type and Date'
            });
        }

        if (!branchCode) {
            branchCode = '0';
        }

        checkAccess('Top Customers', accessLevels).then(async level => {

            const key = `topcusttdcasa${reportType}${selectedDate}${branchCode}${level}`;

            const getFromCatch = await redis.get(key);
            if (getFromCatch) {
                const data = JSON.parse(getFromCatch);
                return resolve(data);
            }

            getTopCustomers_TD_CASA_QUERY(reportType, selectedDate, branchCode, level, scopeLevel).then(q => {
                // console.log('q.....:', q);
                executeFinacleDRQuery(q).then(async (result: any[]) => {

                    if (result && result.length) {
                        try {
                            await redis.set(key, JSON.stringify(result), "ex", parseInt(process.env.REPORT_EXP_DURATION as string, 10));
                            console.log('Redis Insert Okay');

                        } catch (error) {
                            console.log('Redis Insert failed:', error.message);
                        }
                    }

                    return resolve(result);
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

        }).catch(err => {
            return reject({
                err: err,
                message: "Access Denied. Unauthorized User"
            });
        });

    });
};
