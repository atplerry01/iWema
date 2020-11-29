import * as _ from "lodash";
import { executeFinacleLiveQuery } from "../../../db/dbUtil";
import { getCustomerTD_QUERY } from "./query";


export const getCustomerTD = (accno) => {
    return new Promise((resolve, reject) => {
      if (!accno) {
        return reject({
          err: null,
          message: "Account number is required!"
        });
      }

      const q = getCustomerTD_QUERY(accno);

      executeFinacleLiveQuery(q)
        .then(result => {
          return resolve(result);
        })
        .catch(err => {
          return reject({
            err: err,
            message: "Customer's TERM DEPOSIT could not be retrieved"
          });
        });
    });
  };
