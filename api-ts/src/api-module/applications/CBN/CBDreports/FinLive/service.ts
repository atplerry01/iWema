import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getFinLiveQuery } from "./query";

export const getFinLiveService = async (startDate): Promise<any> => {
  try {
    let q;
    //startDate
    q = getFinLiveQuery(startDate);

    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};
