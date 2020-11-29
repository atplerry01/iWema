import { executeMySQL } from "../../../../../db/dbUtil";
import { get_auditedTransactionsSearch_QUERY } from "./query";
// import { checkAccess } from "../../../../../util/utility";

export const get_auditedTransactionsSearch = (
    transactionType,
    AccountNo,
    startdate,
    enddate,
    _allAccess: object
  ) => {
    return new Promise(async (resolve, reject) => {
      // try {
      //     const level = await checkAccess('App Admin', allAccess);
      //     if (level !== 'G') {
      //         return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
      //     }
      // } catch (error) {
      //         return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
      // }

      try {
        const q = get_auditedTransactionsSearch_QUERY(
          transactionType,
          AccountNo,
          startdate,
          enddate
        );
        const result = await executeMySQL(q);
        return resolve(result);
      } catch (err) {
        return reject({
          err: err,
          message: "Audit Query Failed"
        });
      }
    });
  };
