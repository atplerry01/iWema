import { executeSQLServer } from "../../../../../db/dbUtil";
import { getTraceQuery, getTraceQueryWithAccountOnly, getTraceQueryWithDateOnly } from "./query";
//
export const getSystemTraceService = async (hasAccount, hasDateRange, accountNumber, startDate, endDate): Promise<any> => {
  try {
    let q = '';

    if (hasAccount === true && hasDateRange === false) { // acc only
      q = getTraceQueryWithAccountOnly(accountNumber, startDate, endDate);
    } else if (!hasAccount && hasDateRange) { // date only
      q = getTraceQueryWithDateOnly(accountNumber, startDate, endDate);
    } else {
      q = getTraceQuery(accountNumber, startDate, endDate); // all params
    }

    const result = await executeSQLServer(q, {}, "PostilionOffice");
    return result as any;
  } catch (e) {
    return e;
  }
};
