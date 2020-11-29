import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getGuarantorInformationQuery } from "./query";

export const getGuarantorInformationService = async (startDate): Promise<any> => {
  try {
    let q;
    //startDate
    q = getGuarantorInformationQuery(startDate);

    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};
