import { get_BetCollectionPerformance_QUERY } from "./query";
import { executeFinacleDRQuery } from "../../../db/dbUtil";

export const get_BetCollectionPerformance = async (accountNo, startDate, endDate, redis: any) => {

    return new Promise(async (resolve, reject) => {
        
        if (!startDate || !startDate) {
            return reject({
                err: null,
                message: 'Please select Report type and Date'
            });
        }


            const key = `get_BetCollectionPerformance${accountNo}${startDate}${endDate}`;

            const getFromCatch = await redis.get(key);
            if (getFromCatch) {
                console.log('from cache........');
                const data = JSON.parse(getFromCatch);
                  
                return resolve(data);

            }

        try {         
      
          const q =  get_BetCollectionPerformance_QUERY(accountNo, startDate, endDate);                  
           const result = await executeFinacleDRQuery(q);
                
            if (result) {
                try {
                    await redis.set(key, JSON.stringify(result), "ex", parseInt(process.env.REPORT_EXP_DURATION as string, 10));
                    //   console.log('Redis Insert Okay');

                } catch (error) {
                    console.log('Redis Insert failed:', error.message);
                }
            }

            return resolve(result);
            
        } catch (err) {
            return reject({
                        err: err,
                        message: "Something went wrong..."
                    });
        }

    });
};
