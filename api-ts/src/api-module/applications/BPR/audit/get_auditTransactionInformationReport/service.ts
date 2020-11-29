import { executeMySQL } from "../../../../../db/dbUtil";
import { get_auditTransactionInformationReport_QUERY } from "./query";
import { Paginator } from "../../../../../util/utility";

export const get_auditTransactionInformationReport = (_accessLevels, page, per_page) => {
    return new Promise(async (resolve, reject) => {
      //    try {
      //         const level = await this.utilities.checkAccess('Asset Disposal Bids', accessLevels);
      //         if (level !== 'G') {
      //             return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
      //         }
      //     } catch (error) {
      //             return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
      //     }

      const q = get_auditTransactionInformationReport_QUERY();

      executeMySQL(q)
        .then(async result => {
          const res = await Paginator(result, page, per_page);
          return resolve(res);
        })
        .catch(err => {
          return reject({
            err: err,
            message: "Audit Report Retrieval Failed"
          });
        }); // end of execution
    });
  };
