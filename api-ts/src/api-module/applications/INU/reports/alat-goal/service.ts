import { executeSQLServer } from "../../../../../db/dbUtil";
import { getAlatGoalQuery } from "./query";

export const getAlatGoalService = async (): Promise<any> => {
  try {
    let q = getAlatGoalQuery();

    const result = await executeSQLServer(q, {}, "ALAT");
    return result as any;
  } catch (e) {
    return e;
  }
};
