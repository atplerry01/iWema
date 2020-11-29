import { executeFinacleLiveQuery } from '../../../../../db/dbUtil';
import { getMandateByBranchOnlyQuery, getMandateByProductOnlyQuery } from './query';

export const getAccountMandateService = async (serviceType, branchCode, productCode, startDate, endDate): Promise<any> => {

    try {
        
        let q;
                
        if (serviceType === 'ByBranch') {
            q = getMandateByBranchOnlyQuery(branchCode, startDate, endDate);
        } else if (serviceType === 'ByProduct') {
            q = getMandateByProductOnlyQuery(productCode, startDate, endDate);
        }
      
        const result = await executeFinacleLiveQuery(q);
        return result as any;
    } catch (e) {
        return e;
    }
};
