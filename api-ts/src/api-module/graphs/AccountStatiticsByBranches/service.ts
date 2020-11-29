import * as _ from "lodash";
import { checkAccess } from "../../../util/utility";
import { executeMySQL } from "../../../db/dbUtil";
import { getAccountStatiticsByBranches_QUERY } from "./query";



export const getAccountStatiticsByBranches = async(zoneCode, productType, accessLevels, scopeLevel, redis: any) => {

    return new Promise(async (resolve, reject) => {

        if (!zoneCode || !productType) {
            return reject({ err: null, message: 'Product type and zone code are required' });
        }

        checkAccess('Account Statistics', accessLevels).then(async level => {

            const key = `accStatsbybranchesgraph${zoneCode}${productType}${level}`;
            let getFromCatch = await redis.get(key);
            if (getFromCatch) {
                console.log('from cache........');
                getFromCatch = JSON.parse(getFromCatch);
                return resolve(getFromCatch);
            }

            const q = getAccountStatiticsByBranches_QUERY(zoneCode, productType, level, scopeLevel);
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
                return reject({ err: err, message: "Report not available for this search criteria" });
            }); // end of execution

        }).catch(err => {
            return reject({ err: err, message: "Access Denied. Unauthorized User" });
        });

    });
};

