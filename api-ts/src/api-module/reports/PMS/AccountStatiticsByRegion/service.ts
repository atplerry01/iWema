import { checkAccess } from "../../../../util/utility";
import { getAccountStatiticsByRegion_QUERY } from "./query";
import { executeMySQL } from "../../../../db/dbUtil";

export const getAccountStatiticsByRegion = (productCode, accessLevels, scopeLevel, redis: any) => {

    return new Promise(async (resolve, reject) => {

        if (!productCode) { return reject({
            err: null,
            message: 'Product code is required'
        });
        }

        checkAccess('Account Statistics', accessLevels).then(async level => {
            const key = `accstatiticsbyregion${productCode}${level}`;

            const getFromCatch = await redis.get(key);
            if (getFromCatch) {
                console.log('from cache........');
                const data = JSON.parse(getFromCatch);     
                return resolve(data);
            }

            const q = getAccountStatiticsByRegion_QUERY(productCode, level, scopeLevel);

            executeMySQL(q).then(async result => {

                if (result[0] && result[0].length) {
                    try {
                        await redis.set(key, JSON.stringify(result[0]), "ex", parseInt(process.env.REPORT_EXP_DURATION  as string, 10));

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
