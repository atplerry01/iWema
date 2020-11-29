import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getCreditInformationQuery } from "./query";

export const getCreditInformationService = async (startDate): Promise<any> => {
  try {
    let q;
    //startDate
    q = getCreditInformationQuery(startDate);

    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};
