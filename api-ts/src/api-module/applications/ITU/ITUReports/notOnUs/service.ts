import { executeSQLServer } from "../../../../../db/dbUtil";
import { getPaydirectQuery } from "./query";
//
export const getPaydirectService = async (): Promise<any> => {
  try {
    let q = getPaydirectQuery();

    const result = await executeSQLServer(q, {}, "PostilionOffice");
    return result as any;
  } catch (e) {
    return e;
  }
};
