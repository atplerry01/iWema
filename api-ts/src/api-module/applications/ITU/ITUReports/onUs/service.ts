import { executeSQLServer } from "../../../../../db/dbUtil";
import { getOnUsQuery } from "./query";
//
export const getOnUsService = async (): Promise<any> => {
  try {
    let q = getOnUsQuery();

    const result = await executeSQLServer(q, {}, "PostilionOffice");
    return result as any;
  } catch (e) {
    return e;
  }
};
