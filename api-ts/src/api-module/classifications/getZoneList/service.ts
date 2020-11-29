import { executeMySQL } from "../../../db/dbUtil";
import { getZoneList_QUERY } from "./query";

export const getZoneList = () => {
    return new Promise((resolve, reject) => {
      
      const q =  getZoneList_QUERY();

      executeMySQL(q).then(result => {
        return resolve(result);
      }).catch((err) => {
        return reject({ err: err, message: "No Zone found" });
    }); // end of execution

    });
  };
