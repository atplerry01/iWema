import { executeFinacleLiveQuery } from "../../../db/dbUtil";
import { getAccountOpeningBalance_QUERY } from "./query";

export const getAccountOpeningBalance = (accno, datefrom) => {
    return new Promise((resolve, reject) => {
      if (!accno || !datefrom) {
        return reject({
          err: null,
          message: "Account Number and DateFrom are required!"
        });
      }

      const q = getAccountOpeningBalance_QUERY(accno, datefrom);
        executeFinacleLiveQuery(q)
        .then(result => {
          return resolve(result[0]);
        })
        .catch(err => {
          return reject(err);
        });
    });
  };
