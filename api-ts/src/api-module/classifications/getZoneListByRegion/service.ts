import { executeMySQL } from "../../../db/dbUtil";
import { getZoneListByRegion_QUERY } from "./query";

export const getZoneListByRegion = (regioncode) => {
    return new Promise((resolve, reject) => {
      if (!regioncode) { return reject("Region code is required!"); }

      const q = getZoneListByRegion_QUERY(regioncode);

    executeMySQL(q).then(result => {
        return resolve(result);
      }).catch((err) => {
        return reject({ err: err, message: "No Zone found" });
    }); // end of execution

    });
  };
