import { checkAccess } from "../../../../util/utility";
import { getAccountStatiticsByZones_QUERY } from "./query";
import { executeMySQL } from "../../../../db/dbUtil";

export const getAccountStatiticsByZones = async (regionCode, productCode, accessLevels, scopeLevel, redis: any) => {

    return new Promise(async (resolve, reject) => {

        if (!regionCode || !productCode) {
            return reject({
                err: null,
                message: 'Product code and region code are required'
            });
        }


        checkAccess('Account Statistics', accessLevels).then(async level => {

            const key = `accstatiticsbyzones${regionCode}${productCode}${level}`;

            const getFromCatch = await redis.get(key);
            if (getFromCatch) {
                const data = JSON.parse(getFromCatch);     
                return resolve(data);
            }


            const q = getAccountStatiticsByZones_QUERY(regionCode, productCode, level, scopeLevel);
            // console.log('q:', q);
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
