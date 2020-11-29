import { checkAccess, Paginator } from "../../../util/utility";
import { getCorporatePrincipalBorrower_QUERY } from "./query";
import { executeFinacleDRQuery } from "../../../db/dbUtil";


export const getCorporatePrincipalBorrower = async(callDate, accessLevels, redis: any, page, per_page) => {

    return new Promise(async (resolve, reject) => {

        const level = await checkAccess('CBR-Principal Borrower', accessLevels);
        if (!level) {
            return reject({
                err: "",
                message: "Access Denied. Unauthorized User"
            });
        }
        
        if (!callDate) {
            return reject({
                err: null,
                message: 'Please select Report type and Date'
            });
        }


            const key = `getCorporatePrincipalBorrower${callDate}`;

            const getFromCatch = await redis.get(key);
            if (getFromCatch) {
                const data = JSON.parse(getFromCatch);
                  
                return resolve(Paginator(data, page, per_page));

            }

        try {         
      
          const q =  getCorporatePrincipalBorrower_QUERY(callDate);                  
           const result = await executeFinacleDRQuery(q);
                
            if (result) {
                try {
                    await redis.set(key, JSON.stringify(result), "ex", parseInt(process.env.REPORT_EXP_DURATION as string, 10));
                    //   console.log('Redis Insert Okay');

                } catch (error) {
                    console.log('Redis Insert failed:', error.message);
                }
            }

            const res = await Paginator(result, page, per_page);
                return resolve(res);
            
        } catch (err) {
            return reject({
                        err: err,
                        message: "Something went wrong..."
                    });
        }

    });
};
