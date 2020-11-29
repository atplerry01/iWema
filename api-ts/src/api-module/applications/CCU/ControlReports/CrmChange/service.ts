import { executeFinacleLiveQuery } from '../../../../../db/dbUtil';
import { getCRMChangeQuery } from "./query";

export const getCRMChangeService = async (endDate: any): Promise<any> => {
    try {
        const q = getCRMChangeQuery(endDate);
        const result = await executeFinacleLiveQuery(q);
        return result as any;
    } catch (e) {
        return e;
    }
};

