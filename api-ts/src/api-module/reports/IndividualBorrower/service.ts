import { checkAccess, Paginator } from "../../../util/utility";
import { getIndividualBorrower_QUERY } from "./query";
import { executeFinacleDRQuery } from "../../../db/dbUtil";

 export const getIndividualBorrower = async(callDate, accessLevels, redis: any, page, per_page) => {

    return new Promise(async (resolve, reject) => {

        const level = await checkAccess('CBR-Individual Borrower', accessLevels);
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

            const key = `getIndividualBorrower${callDate}`;

            const getFromCatch = await redis.get(key);
            if (getFromCatch) {
                console.log('from cache........');
                const data = JSON.parse(getFromCatch);
                  
                return resolve(Paginator(data, page, per_page));
            }

        try {         
      
          const q =  getIndividualBorrower_QUERY(callDate);                  
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
