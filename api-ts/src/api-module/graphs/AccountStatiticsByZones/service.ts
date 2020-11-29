import * as _ from "lodash";
import { checkAccess } from "../../../util/utility";
import { executeMySQL } from "../../../db/dbUtil";
import { getAccountStatiticsByZones_QUERY } from "./query";


export const getAccountStatiticsByZones = async(regionCode, productType, accessLevels, scopeLevel, redis: any) => {

    return new Promise(async (resolve, reject) => {

        if (!regionCode || !productType) {
            return reject({ err: null, message: 'Product type and region code are required' });
        }


        checkAccess('Account Statistics', accessLevels).then(async level => {

            const key = `accStatsByzonegraph${regionCode}${productType}${level}`;
            let getFromCatch = await redis.get(key);
            if (getFromCatch) {
                console.log('from cache........');
                getFromCatch = JSON.parse(getFromCatch);
                return resolve(getFromCatch);
            }
            const q = getAccountStatiticsByZones_QUERY(regionCode, productType, level, scopeLevel);
            // console.log('q:', q);
            executeMySQL(q).then(async result => {

                if (result[0] && result[0].length) {
                    try {
                        await redis.set(key, JSON.stringify(result[0]), "ex", parseInt(process.env.REPORT_EXP_DURATION as string, 10));

                    } catch (error) {
                        console.log('Redis Insert failed:', error.message);
                    }
                }

                return resolve(result[0]);
            }).catch((err) => {
                return reject({ err: err, message: "Report not available for this search criteria" });
            }); // end of execution

        }).catch(err => {
            return reject({ err: err, message: "Access Denied. Unauthorized User" });
        });

    });
};

