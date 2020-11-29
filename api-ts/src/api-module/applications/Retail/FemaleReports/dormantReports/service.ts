import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getDormantFemaleAccountsQuery } from "./query";

export const getDormantAccountService = async (startDate, endDate): Promise<any> => {
  try {
    let q;
    q = getDormantFemaleAccountsQuery(startDate, endDate);
    console.log(q);
    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};
