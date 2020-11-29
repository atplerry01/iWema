import { getUnrealizedTransactionQuery } from "../shared/query";
import { executeTreasuryOracleQuery } from './../../../../../db/dbUtil';

export const getUnrealizedTransactionService = async (): Promise<any> => {
    try {
        const q = getUnrealizedTransactionQuery();
        const result = await executeTreasuryOracleQuery(q);
        return result as any;
    } catch (e) {
        return e;
    }
};
