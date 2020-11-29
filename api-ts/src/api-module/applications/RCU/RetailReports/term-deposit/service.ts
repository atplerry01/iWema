import { executeFinacleLiveQuery } from './../../../../../db/dbUtil';
import { getTermDepositByBranchOnlyQuery, getTermDepositByDateAndBranchQuery, getTermDepositByDateOnlyQuery, getTermDepositQuery } from './query';

export const getTermDepositService = async (serviceType, serviceCode, startDate, endDate): Promise<any> => {
    try {

        let q;
        if (serviceType === 'all') {
            q = getTermDepositQuery();
        } else if (serviceType === 'dateOnly') {
            q = getTermDepositByDateOnlyQuery(startDate, endDate);
        } else if (serviceType === 'dateAndBranchOnly') {
            q = getTermDepositByDateAndBranchQuery(serviceCode, startDate, endDate);
        } else if (serviceType === 'branchOnly') {
            q = getTermDepositByBranchOnlyQuery(serviceCode);
        }

        const result = await executeFinacleLiveQuery(q);
        return result as any;
    } catch (e) {
        return e;
    }
};
