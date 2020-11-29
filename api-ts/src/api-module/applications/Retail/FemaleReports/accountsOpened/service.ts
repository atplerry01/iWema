import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getAccountsOpenedQuery } from "./query";

export const getAccountsOpenedService = async (
  startDate,
  endDate
): Promise<any> => {
  try {
    let q;
    q = getAccountsOpenedQuery(startDate, endDate);
    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};
