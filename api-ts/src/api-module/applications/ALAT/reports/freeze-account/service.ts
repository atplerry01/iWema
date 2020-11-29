import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getFreezeAccountQuery } from "./query";

export const getFreezeAccountService = async (accountNumber): Promise<any> => {
  try {
    //startDate
    let q = getFreezeAccountQuery(accountNumber);

    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};
