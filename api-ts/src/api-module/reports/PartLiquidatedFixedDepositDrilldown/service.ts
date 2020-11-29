import { getPartLiquidatedFixedDeposit_DrillDown_QUERY } from "./query";
import { executeFinacleDRQuery } from "../../../db/dbUtil";

export const getPartLiquidatedFixedDepositDrilldown = async(entityId, startDate, endDate, redis: any) => {

    return new Promise(async (resolve, reject) => {
        
        if (!startDate || !startDate) {
            return reject({
                err: null,
                message: 'Please select Report type and Date'
            });
        }


            const key = `getPartLiquidatedFixedDepositDrilldown${entityId}${startDate}${endDate}`;

            const getFromCatch = await redis.get(key);
            if (getFromCatch) {
                const data = JSON.parse(getFromCatch);
                  
                return resolve(data);

            }

        try {         
      
          const q =  getPartLiquidatedFixedDeposit_DrillDown_QUERY(entityId, startDate, endDate);                  
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
