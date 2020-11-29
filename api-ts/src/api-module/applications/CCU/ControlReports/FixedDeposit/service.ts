import { executeFinacleLiveQuery } from './../../../../../db/dbUtil';
import { getAllBranchFixedDepositQuery, getBranchFixedDepositQuery } from './query';

export const getFixedDepositService = async (branchCode, startDate, endDate): Promise<any> => {
    try {
        let q = '';
        
        if (branchCode === 0 || branchCode === '0') {
            q = getAllBranchFixedDepositQuery(startDate, endDate);
        } else {
            q = getBranchFixedDepositQuery(branchCode, startDate, endDate);
        }

        const result = await executeFinacleLiveQuery(q);
        return result as any;
    } catch (e) {
        return e;
    }
};

