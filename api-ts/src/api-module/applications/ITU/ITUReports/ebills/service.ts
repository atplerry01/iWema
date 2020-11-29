import { executeSQLServer } from "../../../../../db/dbUtil";
import { ebillsQuery } from "./query";
//
export const ebillsService = async (startDate, endDate): Promise<any> => {
  try {
    let q = ebillsQuery(startDate, endDate);

    const result = await executeSQLServer(q, {}, "ebills");
    return result as any;
  } catch (e) {
    return e;
  }
};
