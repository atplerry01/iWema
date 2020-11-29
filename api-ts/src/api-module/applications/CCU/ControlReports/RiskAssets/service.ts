import { executeFinacleLiveQuery } from './../../../../../db/dbUtil';
import { getNonSpecifiedWithDateQuery, getNonSpecifiedWithOutDateQuery, getODAWithDateQuery, getODAWithOutDateQuery, getSpecifiedWithDateQuery, getSpecifiedWithOutDateQuery } from './query';

export const getRiskAssetService = async (reportType, startDate): Promise<any> => {
    try {
        let q = '';

        if (reportType === 0 || reportType === '0') {
            if (startDate === 'all') {
                q = getODAWithOutDateQuery();
            } else {
                q = getODAWithDateQuery(startDate);
            }
        } else if (reportType === 1 || reportType === '1') {
            if (startDate === 'all') {
                q = getSpecifiedWithOutDateQuery();
            } else {
                q = getSpecifiedWithDateQuery(startDate);
            }
        } else if (reportType === 2 || reportType === '2') {
            if (startDate === 'all') {
                q = getNonSpecifiedWithOutDateQuery();
            } else {
                q = getNonSpecifiedWithDateQuery(startDate);
            }
        }

        const result = await executeFinacleLiveQuery(q);
        return result as any;
    } catch (e) {
        return e;
    }
};

