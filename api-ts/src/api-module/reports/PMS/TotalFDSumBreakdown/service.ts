import { Paginator, checkAccess } from "../../../../util/utility";
import { getTotalFDSumBreakdown_QUERY } from "./query";
import { executeFinacleDRQuery } from "../../../../db/dbUtil";

export const getTotalFDSumBreakdown = async(staffId: string, requestingStaffId: string, 
    accessLevels, redis: any, page = 1, per_page = 100,  _export = '', filterText = '') => {

    return new Promise(async (resolve, reject) => {

        if (!staffId) {
            return reject({
                err: null,
                message: 'Invalid request. No StaffID provided.'
            });
        }

        let _staffId = staffId;

        const level = await checkAccess('RMs Report', accessLevels);
        if (level && requestingStaffId) {
             _staffId = requestingStaffId;
         }

        const key = `getTotalFDSumBreakdown${_staffId}`;
        const getfromCatch = await redis.get(key);
        if (getfromCatch) {
            // console.log('got from catch.....:');
            let data = await JSON.parse(getfromCatch);
            if (filterText && filterText.length > 0) {
                 data = data.filter(x => x.ACCT_NAME.toLowerCase().includes(filterText.toLowerCase()) || x.ACCT_NO.includes(filterText));
            }
            
            if (_export === '1') {
                return resolve(data);
            }

            const res = await Paginator(data, page, per_page);

            return resolve(res);
        }

        try {
             const q = getTotalFDSumBreakdown_QUERY( _staffId, 'm'); 

       const result = await executeFinacleDRQuery(q) as any[];

       if (result && result.length) {
       await redis.set(key, JSON.stringify(result), "ex", parseInt(process.env.REPORT_EXP_DURATION as string, 10));
      //  console.log('Redis Insert Okay');
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