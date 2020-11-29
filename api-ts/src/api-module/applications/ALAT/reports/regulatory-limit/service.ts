import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getRegulatoryLimitQuery } from "./query";
//
export const getRegulatoryLimitService = async (): Promise<any> => {
  try {
    let q;

    q = getRegulatoryLimitQuery();

    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};
