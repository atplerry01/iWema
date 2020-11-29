import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getIndividualBorrowerQuery } from "./query";

export const getIndividualBorrowerService = async (startDate): Promise<any> => {
  try {
    let q;
    //startDate
    q = getIndividualBorrowerQuery(startDate);

    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};
