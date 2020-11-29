import { executeFinacleLiveQuery } from './../../../../../db/dbUtil';
import { getAccReactivationByBranchQuery, getAccReactivationQuery } from './query';

export const getAccReactivationService = async (branchCode, startDate, endDate): Promise<any> => {

    let q = '';

    if (branchCode === 0 || branchCode === '0') {
        q = getAccReactivationQuery(startDate, endDate);
    } else {
        q = getAccReactivationByBranchQuery(branchCode, startDate, endDate);
    }

    try {
        // q = getAccReactivationQuery(startDate, endDate);
        const result = await executeFinacleLiveQuery(q);
        return result as any;
    } catch (e) {
        return e;
    }
};

