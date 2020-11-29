import { getTopDepositorsQuery } from "../shared/query";
import { executeFinacleLiveQuery } from './../../../../../db/dbUtil';
import { TopDepositor } from './../../../../../entity/TBU/Reports/TopDepositor';

export const getTopDepositorDetails2 = async () => {
    return await TopDepositor.find();
};

export const getTopDepositorDetails = async (amount: any): Promise<any> => {

    try {
        const q = getTopDepositorsQuery(amount);

        const result = await executeFinacleLiveQuery(q);

        return result as any;
    } catch (e) {

        return e;
    }
};
