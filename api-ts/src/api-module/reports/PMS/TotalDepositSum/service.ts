import { Paginator, checkAccess } from "../../../../util/utility";
import { getTotalDepositSum_QUERY } from "./query";
import { executeFinacleDRQuery } from "../../../../db/dbUtil";

export const getTotalDepositSum = async (staffId: string, startDate: string, endDate: string, 
    accessLevels,  redis: any, filterText = '') => {
    return new Promise(async (resolve, reject) => {

        if (!staffId) {
            return reject({
                err: null,
                message: 'Invalid request. No StaffID provided.'
            });
        }
        const requestingStaffId = '' ;
        let _staffId = staffId;

        const level = await  checkAccess('RMs Report', accessLevels);
        if (level && requestingStaffId) {
             _staffId = requestingStaffId;
         }

        const key = `getTotalDepositSum${_staffId}${startDate}${endDate}`;
        const getfromCatch = await redis.get(key);
        if (getfromCatch) {
            // console.log('got from catch.....:');
            let data = await JSON.parse(getfromCatch);
            if (filterText && filterText.length > 0) {
                 data = data.filter(x => x.ACCT_NAME.toLowerCase().includes(filterText.toLowerCase()) || x.ACCT_NO.includes(filterText));
            }
                         
            const res = await Paginator(data);

            return resolve(res);
        }

        try {
             const q = getTotalDepositSum_QUERY( _staffId, startDate, endDate); 

       const result = await executeFinacleDRQuery(q) as any[];

       if (result && result.length) {
       await redis.set(key, JSON.stringify(result), "ex", parseInt(process.env.REPORT_EXP_DURATION as string, 10));
      //  console.log('Redis Insert Okay');
       }

       const res = await Paginator(result);
       return resolve(res);

    } catch (err) {
        console.log('err:', JSON.stringify(err));
        return reject({
                     err: err,
                     message: "Something went wrong..."
                 });
    }

    });
};
