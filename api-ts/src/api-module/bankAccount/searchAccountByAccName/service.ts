import * as _ from "lodash";
import { checkAccess } from "../../../util/utility";
import { executeMySQL } from "../../../db/dbUtil";
import { searchAccountByAccName_QUERY } from "./query";

export const searchAccountByAccName = async (searchTerm, accessLevels, scopeLevel, redis: any) => {
    return new Promise(async (resolve, reject) => {
      if (!searchTerm) {
        return reject({
          err: null,
          message: "Account name is required"
        });
      }

      searchTerm = _.toLower(searchTerm);

      checkAccess("Customer Account", accessLevels).then(async level => {

        const key = `searchAccByAccName${level}${searchTerm}`;

        let getFromCatch = await redis.get(key);
        if (getFromCatch) {
          console.log('from cache........');
          getFromCatch = JSON.parse(getFromCatch);
          return resolve(getFromCatch);
        }

        searchAccountByAccName_QUERY(searchTerm, level, scopeLevel).then(q => {
     
          executeMySQL(q).then(async (result: any[]) => {

            if (result && result.length) {
              try {
                await redis.set(key, JSON.stringify(result), "ex", 60 * 30); // store for 30 mins
              } catch (error) {
                console.log('Redis Insert failed:', error.message);
              }
            }

            return resolve(result);
          }).catch(err => {
            return reject(err);
          });

        }).catch(err => {
          return reject({
            err: err,
            message: "No user found"
          });
        }); // end of execution

      })
        .catch(err => {
          if (err) { return reject({
            err: err,
            message: "Access Denied. Unauthorized User"
          });
          }
        });

    });

  };
