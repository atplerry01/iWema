import { executeFinacleLiveQuery } from './../../../../../db/dbUtil';
import { IFinacleLoans } from "./interfaces";
import { getLoanCollectionsDetailsQuery } from "./query";

export const getLoanCollectionsDetails = async (accountNos: string[]): Promise<IFinacleLoans[] | any> => {
    try {
        const q = getLoanCollectionsDetailsQuery(accountNos);
        const result = await executeFinacleLiveQuery(q);
        return result as IFinacleLoans[];
    } catch (e) {
        return e;
    }
};