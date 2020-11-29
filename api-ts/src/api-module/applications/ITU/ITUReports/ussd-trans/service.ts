import { executeSQLServer } from "../../../../../db/dbUtil";
import { getUssdTransQuery } from "./query";
//
export const getUssdTransService = async (
  transId,
  startDate,
  endDate
): Promise<any> => {
  try {
    let q = getUssdTransQuery(transId, startDate, endDate);

    const result = await executeSQLServer(q, {}, "PostilionOffice");
    return result as any;
  } catch (e) {
    return e;
  }
};
