import { isAllowed } from "../shared";
import { get_obsolete_car_QUERY } from "./query";
import { executeMySQL } from "../../../../../db/dbUtil";
import { bidopened } from "../../../../../util/config";

export const get_obsolete_car = (grade: string) => {
    return new Promise(async (resolve, reject) => {
      if (!isAllowed(grade)) {
        return reject({
          err: null,
          message: "Access Denied. Unauthorized User"
        });
      }

      try {
        const q = get_obsolete_car_QUERY();
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
