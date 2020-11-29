import "reflect-metadata";
import { executeFinacleLiveQuery, executeSQLServer } from "../../../../../db/dbUtil";
import { getBtsWebQuery, getInfoShareQuery } from "./query";

export const getInfoShareService = async (startDate, endDate): Promise<any> => {
  try {

    let finResult: any = [];
    let sqlResult: any = [];
    const finalResult: any[] = [];

    const q = getInfoShareQuery(startDate, endDate);
    finResult = await executeFinacleLiveQuery(q);

    const q2 = getBtsWebQuery(startDate, endDate);
    sqlResult = await executeSQLServer(q2, {}, 'BtsWeb');
    
    finResult.forEach(finEnt => {
      sqlResult.forEach(sqlEnt => {
        if (finEnt.ACCOUNT_NUMBER === sqlEnt.accountno && finEnt.INIT_BRNCH === sqlEnt.origBranchCode) {
          const mergedData = { ...finEnt, ...sqlEnt };
          finalResult.push(mergedData);
        }
      });
    });

    return finalResult as any;
  } catch (e) {
    return e;
  }
};
