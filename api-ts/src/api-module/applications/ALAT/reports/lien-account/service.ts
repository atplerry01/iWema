import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getLienAccountQuery } from "./query";

export const getLienAccountService = async (
  accountNumber,
  cif
): Promise<any> => {
  try {
    //startDate
    let q = getLienAccountQuery(accountNumber, cif);

    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};
