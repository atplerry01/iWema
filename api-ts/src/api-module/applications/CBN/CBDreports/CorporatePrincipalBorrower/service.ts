import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getCorporatePrincipalQuery } from "./query";

export const getCorporatePrincipalService = async (startDate): Promise<any> => {
  try {
    let q;
    //startDate
    q = getCorporatePrincipalQuery(startDate);

    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};
