import { executeSQLServer } from "../../../../../db/dbUtil";
import { getAutopayQuery } from "./query";
//
export const geAutopayService = async (): Promise<any> => {
  try {
    let q = getAutopayQuery();

    const result = await executeSQLServer(q, {}, "PostilionOffice");
    return result as any;
  } catch (e) {
    return e;
  }
};
