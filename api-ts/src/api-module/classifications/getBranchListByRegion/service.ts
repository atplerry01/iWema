import { executeMySQL } from "../../../db/dbUtil";
import { getBranchListByRegion_QUERY } from "./query";

export const getBranchListByRegion = (regioncode) => {
    return new Promise((resolve, reject) => {
     
      if (!regioncode) {  return reject("Region code is required"); }      

      const q = getBranchListByRegion_QUERY(regioncode);

     executeMySQL(q).then(result => {
       // this.branch = this.branch.set(zonecode, result);
        return resolve(result);
      }).catch((err) => {
        return reject({ err: err, message: "No branches found" });
    }); // end of execution

    });
  };
