import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getInduceTransactionQuery } from "./query";

export const getInduceTransactionService = async (): Promise<any> => {
  try {
    let q = getInduceTransactionQuery();

    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};
