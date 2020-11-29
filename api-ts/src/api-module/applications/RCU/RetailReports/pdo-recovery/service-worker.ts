import * as workerFarm from "worker-farm";
import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { IAccountPhoneEmail } from "../../../CMG/pan-processor/processor/interface";
import { IInflowParam } from "./interface";
import { getPDOInFlowQuery } from "./query";

module.exports = async (data: IInflowParam[], startDate, endDate, callback: workerFarm.WorkerCallback) => {
  try {
    
    // throw error if no data supplied in excel
    if (!data.length) {
      // throw new Error('File does not contain valid data');
      return callback('File does not contain valid data', null, null, null);
    }

    let finacleData: IAccountPhoneEmail[] = [];

    if (data.length > 1000) {
      const totalLoops = Math.ceil(data.length / 1000);
      for (let i = 0; i <= totalLoops; i++) {
        const _dt = [...data]; // copy the original data
        const _data = _dt.splice(i * 1000, 1000); // take 1000 records out and store in _data

        // check if _data has result
        if (_data.length) {
              
          const q = getPDOInFlowQuery(_data.map(acc => acc.accno.trim()), startDate, endDate); // form the query
          const _result = await executeFinacleLiveQuery(q) as any[]; // execute Finacle

          if (_result.length) {
            const mergedData = [...finacleData, ..._result]; // merge the new result to the existing one
            finacleData = mergedData; // overide the finacledata with the new merged data
          }
        }
      }
    } else {

      const q = getPDOInFlowQuery(data.map(acc => acc.accno.trim()), startDate, endDate); // form the query
      const _result = await executeFinacleLiveQuery(q) as any[]; // execute Finacle

      if (!_result.length) {
        //  throw new Error('No matching accounts found in Finacle');
        return callback('No matching accounts found in Finacle', null, null, null);
      }

      finacleData = [..._result]; 
    }

    // return fResult;
    return callback(null, finacleData, null, null);
  } catch (e) {
    // throw new Error(e);
    return callback(e, null, null, null);
  }
};
