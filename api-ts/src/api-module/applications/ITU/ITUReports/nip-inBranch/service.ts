import { executeSQLServer } from "../../../../../db/dbUtil";
import { NIPInbranchQuery } from "./query";
//
export const NIPInbranchService = async (startDate, endDate): Promise<any> => {
  try {
    let q = NIPInbranchQuery(startDate, endDate);

    const result = await executeSQLServer(q, {}, "nip-inbranch");
    return result as any;
  } catch (e) {
    return e;
  }
};
