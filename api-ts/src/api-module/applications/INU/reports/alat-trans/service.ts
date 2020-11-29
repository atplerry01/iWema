import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getAlatTransQuery } from "./query";

export const getAlatTransService = async (): Promise<any> => {
  try {
    let q = getAlatTransQuery();

    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};
