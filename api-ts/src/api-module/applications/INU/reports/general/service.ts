import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getGeneralInfoQuery } from "./query";

export const getGeneralInfoService = async (): Promise<any> => {
  try {
    let q = getGeneralInfoQuery();

    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};
