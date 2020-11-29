import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getRestrictedAccountQuery } from "./query";
//
export const getRestrictedAccountService = async (date: any): Promise<any> => {
  try {
    let q;

    q = getRestrictedAccountQuery(date);

    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};
