import * as _ from "lodash";
import { checkAccess } from "../../../util/utility";
import { executeFinacleLiveQuery } from "../../../db/dbUtil";
import { getCustomerAccounts_QUERY } from "./query";
import { getEmployeeByStaffNo } from "../../users/getEmployeeByStaffNo/service";


export const getCustomerAccounts = (accno, ownAccount, accessLevels, scopeLevel) => {
    return new Promise((resolve, reject) => {
      if (!accno) {
        return reject({
          err: null,
          message: "Account number is required!"
        });
      }

      if (!ownAccount || !accessLevels || !scopeLevel) {
        return reject({
          err: null,
          message: "Access Denied. Your access level could not be verifed. Contact system administrator."
        });
      }

     checkAccess("Customer Account", accessLevels).then(level => {

        getCustomerAccounts_QUERY(accno, ownAccount, level, scopeLevel).then(q => {
            // console.log('q:', q);
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
                  message: "Customer account could not be retrieved"
                });
              }); // end of oracle execution
          })
            .catch(err => {
              return reject(err);
            });
        })
        .catch(err => {
          if (err) {
            return reject({
              err: err,
              message: "Access Denied. Unauthorized User"
            });
          }
        });
    });
  };
