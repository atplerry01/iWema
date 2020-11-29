import { executeMySQL } from "../../../../../db/dbUtil";
import { checkAccess, Paginator } from "../../../../../util/utility";
import { get_obsoletecar_bidreport_QUERY } from "./query";

export const get_obsoletecar_bid = (id: number, accessLevels, page, per_page) => {
    return new Promise(async (resolve, reject) => {
      try {
        const level = await checkAccess(
          "Asset Disposal Bids",
          accessLevels
        );
        if (level !== "G") {
          return reject({
            err: null,
            message: "Access Denied. Unauthorized User"
          });
        }
      } catch (error) {
        return reject({
          err: null,
          message: "Access Denied. Unauthorized User"
        });
      }
      
      const q = get_obsoletecar_bidreport_QUERY(id);

      executeMySQL(q)
        .then(async result => {
          const res = await Paginator(result, page, per_page);
          return resolve(res);
        })
        .catch(err => {
          return reject({
            err: err,
            message: "Bids report failed to retrieve"
          });
        }); // end of execution
    });
  };
