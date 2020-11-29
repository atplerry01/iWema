import { executeMySQL } from "../../../../../db/dbUtil";
import { get_auditProcessType_QUERY } from "./query";

export const get_auditProcessType = (_accessLevels) => {
    return new Promise(async (resolve, reject) => {
      //    try {
      //         const level = await this.utilities.checkAccess('Asset Disposal Bids', accessLevels);
      //         if (level !== 'G') {
      //             return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
      //         }
      //     } catch (error) {
      //             return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
      //     }

      try {
        const q = get_auditProcessType_QUERY();
        const auditProcessType = await executeMySQL(q);
        const result = { auditProcessType };
        return resolve(result);
      } catch (err) {
        return reject({
          err: err,
          message: "Audit Process Type Retrieval"
        });
      }
    });
  };
