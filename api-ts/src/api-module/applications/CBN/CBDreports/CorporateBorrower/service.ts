import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getCorporateBorrowerServiceQuery } from "./query";
//
export const getCorporateBorrowerService = async (startDate): Promise<any> => {
  try {
    let q;

    q = getCorporateBorrowerServiceQuery(startDate);

    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};
