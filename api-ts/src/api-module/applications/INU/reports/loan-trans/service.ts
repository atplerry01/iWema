import { executeSQLServer } from './../../../../../db/dbUtil';
import { getLoanTransQuery } from "./query";

export const getLoanTransService = async (): Promise<any> => {
  try {
    let q = getLoanTransQuery();

    const result = await executeSQLServer(q, {}, "ALAT");
    return result as any;
  } catch (e) {
    return e;
  }
};
