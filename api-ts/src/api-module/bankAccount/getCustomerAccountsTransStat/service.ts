import * as _ from "lodash";
import { executeFinacleLiveQuery } from "../../../db/dbUtil";
import { getCustomerAccountsTransStat_QUERY } from "./query";


export const getCustomerAccountsTransStat = (accno,
    cDate, cMonthStartDate, cMonthEndDate, cYearStartDate, cYearEndDate ) => {
    return new Promise((resolve, reject) => {
      if (!accno ||
        !cDate ||
        !cMonthStartDate ||
        !cMonthEndDate ||
        !cYearStartDate ||
        !cYearEndDate
      ) {
        return reject({
          err: null,
          message: "Some parameters were not provided!"
        });
      }

      const q = getCustomerAccountsTransStat_QUERY(
        accno,
        cDate,
        cMonthStartDate,
        cMonthEndDate,
        cYearStartDate,
        cYearEndDate
      );

      executeFinacleLiveQuery(q)
        .then(result => {
          return resolve(result);
        })
        .catch(err => {
          return reject({
            err: err,
            message: "Account statistics could not be retrieved"
          });
        });
    });
  };
