import { executeSQLServer } from "../../../../../db/dbUtil";
import { revpayQuery } from "./query";
//
export const revpayService = async (startDate, endDate): Promise<any> => {
  try {
    let q = revpayQuery(startDate, endDate);

    const result = await executeSQLServer(q, {}, "revpay");
    return result as any;
  } catch (e) {
    return e;
  }
};
