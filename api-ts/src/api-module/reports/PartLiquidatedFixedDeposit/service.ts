import { checkAccess, Paginator } from "../../../util/utility";
import { getPartLiquidatedFixedDeposit_QUERY } from "./query";
import { executeFinacleDRQuery } from "../../../db/dbUtil";

export const getPartLiquidatedFixedDeposit = async(dateType, startDate, endDate, accountNo, branchCode, status, accessLevels, scopeLevel, redis: any, page, per_page, _export) => {

    return new Promise(async (resolve, reject) => {
        
        if (!startDate || !startDate) {
            return reject({
                err: null,
                message: 'Please select Report type and Date'
            });
        }

            // todo: change the Top Customer to the right access
            const level = await checkAccess('Fixed Deposit', accessLevels);
            if (!level) {
                return reject({
                    err: "",
                    message: "Access Denied. Unauthorized User"
                });
            }

            const key = `getPartLiquidatedFixedDeposit${dateType}${startDate}${endDate}${accountNo}${branchCode}${level}`;

            const getFromCatch = await redis.get(key);
            if (getFromCatch) {
                const data = JSON.parse(getFromCatch);
               
                if (_export === '1') {
                    return resolve(data);
                }

                const _res = await Paginator(data, page, per_page);
                return resolve(_res);

            }

        try {         
      
          const q = await getPartLiquidatedFixedDeposit_QUERY(dateType, startDate, endDate, accountNo, branchCode, status, level, scopeLevel);                  
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

