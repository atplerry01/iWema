import * as _ from "lodash";
import { executeFinacleLiveQuery } from "../../../db/dbUtil";
import { getCustomerLoan_QUERY } from "./query";


export const getCustomerLoan = (accno) => {
    return new Promise((resolve, reject) => {
      if (!accno) {
        return reject({
          err: null,
          message: "Account number is required!"
        });
      }

      const q = getCustomerLoan_QUERY(accno);

      executeFinacleLiveQuery(q)
        .then(result => {
          return resolve(result);
        })
        .catch(err => {
          return reject({
            err: err,
            message: "Customer's LOAN could not be retrieved"
          });
        });
    });
  };
