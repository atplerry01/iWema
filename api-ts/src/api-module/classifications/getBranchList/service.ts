import { executeMySQL } from "../../../db/dbUtil";
import { getBranchList_QUERY } from "./query";

export const getBranchList = () => {
    return new Promise((resolve, reject) => {
     
      const q = getBranchList_QUERY();

       executeMySQL(q).then(result => {
        return resolve(result);
      }).catch((err) => {
        return reject({ err: err, message: "No branches found" });
    }); // end of execution

    });
  };
