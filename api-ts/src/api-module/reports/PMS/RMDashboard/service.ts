import { checkAccess } from "../../../../util/utility";
import { getTotalDepositByStaffId_QUERY, getTotalLoanByStaffId_QUERY, getTotalAccountsByStaffId_QUERY } from "./query";
import { executeFinacleDRQuery } from "../../../../db/dbUtil";

export const getRMDashboard = async (staffId: string, requestingStaffId: string, accessLevels, redis: any) => {

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

        const key = `getRMDashboard${_staffId}`;
        const getfromCatch = await redis.get(key);
        if (getfromCatch) {
            // console.log('got from catch.....:');
            const data = await JSON.parse(getfromCatch);
             return resolve(data);
        }

        try {
            
        const tdq = getTotalDepositByStaffId_QUERY('S' + _staffId);
        const tlq = getTotalLoanByStaffId_QUERY('S' + _staffId); // all account
        const taq = getTotalAccountsByStaffId_QUERY('S' + _staffId, '');  // staffId = '08166'
       
        const promises = [
            executeFinacleDRQuery(tdq),
            executeFinacleDRQuery(tlq),
            executeFinacleDRQuery(taq)
        ];

       const result = await Promise.all(promises);

       await redis.set(key, JSON.stringify(result), "ex", parseInt(process.env.REPORT_EXP_DURATION as string, 10));
      //  console.log('Redis Insert Okay');

       return resolve(result);

    } catch (err) {
        console.log('err:', JSON.stringify(err));
        return reject({
                     err: err,
                     message: "Something went wrong..."
                 });
    }

    });
};

