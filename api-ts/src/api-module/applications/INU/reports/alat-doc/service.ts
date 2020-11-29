import { executeSQLServer } from './../../../../../db/dbUtil';
import { getAlatDocQuery } from './query';

export const getAlatDocService = async (): Promise<any> => {
  try {
    let q = getAlatDocQuery();

    const result = await executeSQLServer(q, {}, "ALAT");
    return result as any;
  } catch (e) {
    return e;
  }
};
