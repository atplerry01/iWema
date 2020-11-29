import { checkAccess } from "../../../../util/utility";
import { getTotalAccountStatusByStaffId_QUERY, getTotalAccounts5KAvgByStaffId_QUERY, getTotalReactivatedAccountsByStaffId_QUERY } from "./query";
import { getTotalAccountsByStaffId_QUERY } from "../RMDashboard/query";
import { executeFinacleDRQuery } from "../../../../db/dbUtil";

export const getRMNonFinancials = async(staffId: string, requestingStaffId: string, accessLevels, redis: any) => {

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

        const key = `getRMNonFinancials${_staffId}`;
        const getfromCatch = await redis.get(key);
        if (getfromCatch) {
            // console.log('got from catch.....:');
            const data = await JSON.parse(getfromCatch);
             return resolve(data);
        }

        try {
            
        const all_acc_q = getTotalAccountsByStaffId_QUERY('S' + _staffId, '');  // all account opened
        const all_acc_y_q = getTotalAccountsByStaffId_QUERY('S' + _staffId, 'y');  // all account opened this year
        const acc_5k_q = getTotalAccounts5KAvgByStaffId_QUERY(_staffId); 
       // const unfunded_acc_q = getUnfundedAccountsByStaffId_QUERY('S' + _staffId); 

        const active_acc_q = getTotalAccountStatusByStaffId_QUERY('S' + _staffId, 'A'); 
        const inactive_acc_q = getTotalAccountStatusByStaffId_QUERY('S' + _staffId, 'I'); 
        const dormant_acc_q = getTotalAccountStatusByStaffId_QUERY('S' + _staffId, 'D'); 

        const acc_react_y_q = getTotalReactivatedAccountsByStaffId_QUERY(_staffId, 'y'); 
        const acc_react_m_q = getTotalReactivatedAccountsByStaffId_QUERY(_staffId, 'm'); 

       // console.log(unfunded_acc_q)
        const promises = [
            executeFinacleDRQuery(all_acc_q),
            executeFinacleDRQuery(all_acc_y_q),
            executeFinacleDRQuery(acc_5k_q),
           // this.dbHelper.executeFinacleDRQuery(unfunded_acc_q),
            executeFinacleDRQuery(active_acc_q),
            executeFinacleDRQuery(inactive_acc_q),
            executeFinacleDRQuery(dormant_acc_q),
            executeFinacleDRQuery(acc_react_y_q),
            executeFinacleDRQuery(acc_react_m_q)
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
