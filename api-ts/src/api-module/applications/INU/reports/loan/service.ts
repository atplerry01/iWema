import { executeSQLServer } from './../../../../../db/dbUtil';
import { getLoanQuery } from "./query";

export const getLoanService = async (): Promise<any> => {
  try {
    let q = getLoanQuery();

    const result = await executeSQLServer(q, {}, "ALAT");
    return result as any;
  } catch (e) {
    return e;
  }
};
