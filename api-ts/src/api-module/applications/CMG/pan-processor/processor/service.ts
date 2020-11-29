 import { executeFinacleLiveQuery } from "./../../../../../db/dbUtil";
import { IAccountPhoneEmail, IDownloadable, IParam } from "./interface";
import { getFINPanQuery } from "./query";
import * as workerFarm from "worker-farm";

module.exports = async (data: IParam[], callback: workerFarm.WorkerCallback) => {
  try {
  

    // throw error if no data supplied in excel
    if (!data.length) {
     // throw new Error('File does not contain valid data');
    return callback('File does not contain valid data', null, null, null);
    }

    let finacleData: IAccountPhoneEmail[] = [];

    // execute this code if record has more than 1000 data
    if (data.length > 1000) {

      // get total loops. if result is 4.1 then change it to 5 loops
    const totalLoops = Math.ceil(data.length / 1000);

    for (let i = 0; i <= totalLoops; i++) {

      const _dt = [...data]; // copy the original data
      const _data = _dt.splice(i * 1000,  1000); // take 1000 records out and store in _data

      // check if _data has result
      if (_data.length) {

        // query Finacle
      const _q = getFINPanQuery(_data.map(acc => acc.accno.trim())); // form the query   
      const _result = await executeFinacleLiveQuery(_q) as IAccountPhoneEmail[]; // execute Finacle

      // check if the result has data
       if (_result.length) {
          const mergedData = [...finacleData, ..._result]; // merge the new result to the existing one
          finacleData = mergedData; // overide the finacledata with the new merged data
       }
      }

    }
    
  } else {
    // execute this code if data is less than 1000 records   
    
    const q = getFINPanQuery(data.map(acc => acc.accno.trim())); // form the query
    const _result = await executeFinacleLiveQuery(q) as IAccountPhoneEmail[]; // execute Finacle
   
    if (!_result.length) {
    //  throw new Error('No matching accounts found in Finacle');
    return  callback('No matching accounts found in Finacle', null, null, null);
    }

    finacleData = [..._result]; // assign the new result to finacleData
  }


    const finalResult: IDownloadable[] = [];

    // set default values to the finalResult
    data.forEach(d => {

      // form the data
      const dc: IDownloadable = {
        ACTION: "ADD",
        PAN: d.pan,
        MOBILENUMBER: "",
        EMAIL: "noreply@wemabank.com",
        SEGMENTATIONINDICATOR: "01",
        ACCOUNTNO: d.accno.trim()
      };

      finalResult.push(dc); // add the data to finalResult
    });


    // start merging finalResult with data from Finacle
    finacleData.forEach(x => {
     
      // check if the account number return result from Financle
      const indx = finalResult.findIndex(f => f.ACCOUNTNO === x.FORACID.trim());

      if (indx === -1) {
        return; // if no result returned from Finacle skip execution to the next
      }

      if (x.PHONEOREMAIL.trim().toUpperCase() === "EMAIL") {
        finalResult[indx].EMAIL = x.EMAIL;
      } else {
        // remove all special characters and leave only numbers
        let phoneFormat = x.PHONENO ? x.PHONENO.toString().replace(/[^a-zA-Z0-9]/g, "") : '';

        if (phoneFormat.startsWith("0") && phoneFormat.length === 11) {
          phoneFormat = phoneFormat.slice(1);
          phoneFormat = "234" + phoneFormat;
        } else if (phoneFormat.length === 10) {
          phoneFormat = "234" + phoneFormat;
        } else if (phoneFormat.startsWith("2340")) {
          phoneFormat = phoneFormat.replace("2340", "234");
        }

        finalResult[indx].MOBILENUMBER = phoneFormat;
      }

    });
   
// sort the finalResult by mobile number
    const sortedFinalResult = finalResult.sort((a, b) => (a.MOBILENUMBER > b.MOBILENUMBER) ? 1 : -1);

    // removing account number field from final data
    const fResult = sortedFinalResult.map(itm => {
      delete itm.ACCOUNTNO;
      return itm;
    });

   // return fResult;
   return callback(null, fResult, null, null);
  } catch (e) {
     // throw new Error(e);
    return callback(e, null, null, null);
  }
};
