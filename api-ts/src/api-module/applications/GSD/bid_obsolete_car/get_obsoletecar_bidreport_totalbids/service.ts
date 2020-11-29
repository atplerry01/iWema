import { executeMySQL } from "../../../../../db/dbUtil";
import { checkAccess } from "../../../../../util/utility";
import { get_obsoletecar_bidreport_totalbids_QUERY } from "./query";
import { bidopened } from "../../../../../util/config";

export const get_obsoletecar_bidreport_totalbids = (accessLevels) => {
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

      try {
        const q = get_obsoletecar_bidreport_totalbids_QUERY();
        const cars = await executeMySQL(q);
        const result = { cars, bidopened };
        return resolve(result);
      } catch (err) {
        return reject({
          err: err,
          message: "Cars retrieval failed"
        });
      }
    });
  };
