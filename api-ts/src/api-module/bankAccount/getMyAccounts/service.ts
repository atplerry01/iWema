import * as _ from "lodash";
import { executeFinacleLiveQuery } from "../../../db/dbUtil";
import { getCustomerAccounts_QUERY } from "./query";
import { getEmployeeByStaffNo } from "../../users/getEmployeeByStaffNo/service";

export const getMyAccounts = (accno, ownAccount) => {
    return new Promise((resolve, reject) => {
      if (!accno) {
        return reject({
          err: null,
          message: "Account number is required!"
        });
      }

      if (!ownAccount) {
        return reject({
          err: null,
          message: "Invalid requesst."
        });
      }

      getCustomerAccounts_QUERY(accno, ownAccount, '', '').then(q => {
        executeFinacleLiveQuery(q).then(result => {
          const accManager = _.get(result[0], "ACCOUNTMANAGER", "");

          if (!accManager) { return resolve(result); }

          getEmployeeByStaffNo(accManager)
            .then(user => {
              const finalresult = {
                accountdetail: result,
                accountmanger: user
              };

              return resolve(finalresult);
            })
            .catch(_err => {
              const finalresult = {
                accountdetail: result,
                accountmanger: null
              };

              return resolve(finalresult);
            });
        })
          .catch(err => {
            return reject({
              err: err,
              message: "Your account could not be retrieved"
            });
          }); // end of oracle execution
      })
        .catch(err => {
          return reject(err);
        });
    });
  };
