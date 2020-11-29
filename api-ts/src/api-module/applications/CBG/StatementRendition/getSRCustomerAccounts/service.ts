import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getCustomerAccounts_QUERY } from "./query";


export const getCustomerAccounts = (accno) => {
    return new Promise((resolve, reject) => {
      if (!accno) {
        return reject({
          err: null,
          message: "Account number is required!"
        });
      }

        const q = getCustomerAccounts_QUERY(accno);
            // console.log('q:', q);
            executeFinacleLiveQuery(q).then(result => {
              return resolve(result);
            })
              .catch(err => {
                return reject({
                  err: err,
                  message: "Customer account could not be retrieved"
                });
              }); // end of oracle execution

    });
  };
