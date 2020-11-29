import { getRegionList_QUERY } from "./query";
import { executeMySQL } from "../../../db/dbUtil";

export const getRegionList = () => {
    return new Promise((resolve, reject) => {
     
      const q = getRegionList_QUERY(); 

      executeMySQL(q).then(result => {
          return resolve(result);
        }).catch(err => {
          return reject({ err: err, message: "No report found" });
        }); // end of execution
    });
  };
