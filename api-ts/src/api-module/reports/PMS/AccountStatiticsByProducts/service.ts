import { checkAccess } from "../../../../util/utility";
import { getAccountStatiticsByProducts_QUERY } from "./query";
import { executeMySQL } from "../../../../db/dbUtil";

export const  getAccountStatiticsByProducts = async(accessLevels, scopeLevel, redis: any) => {

    return new Promise(async (resolve, reject) => {

        checkAccess('Account Statistics', accessLevels).then(async level => {

            const key = `accStatiticsByProducts${level}`;
            const getFromCatch = await redis.get(key);
            if (getFromCatch) {
                console.log('from cache........');
                const data = JSON.parse(getFromCatch);      
                return resolve(data);
            }

            const q = getAccountStatiticsByProducts_QUERY(level, scopeLevel);

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
