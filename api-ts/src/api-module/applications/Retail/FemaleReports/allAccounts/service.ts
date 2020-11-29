import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getAllAccountsQuery } from "./query";

export const getAllAccountsService = async (startDate, endDaate): Promise<any> => {
  try {
    let q;
    q = getAllAccountsQuery(startDate, endDaate);
    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};
