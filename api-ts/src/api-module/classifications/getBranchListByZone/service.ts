import { executeMySQL } from "../../../db/dbUtil";
import { getBranchListByZone_QUERY } from "./query";

export const getBranchListByZone = (zonecode) => {
    return new Promise((resolve, reject) => {
     
      if (!zonecode) {  return reject("Zone code is required"); }      

      const q = getBranchListByZone_QUERY(zonecode);

     executeMySQL(q).then(result => {
       // this.branch = this.branch.set(zonecode, result);
        return resolve(result);
      }).catch((err) => {
        return reject({ err: err, message: "No branches found" });
    }); // end of execution

    });
  };
