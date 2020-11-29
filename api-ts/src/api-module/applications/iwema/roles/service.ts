import { get_Roles_QUERY } from "./query";
import { executeMySQL } from "../../../../db/dbUtil";

export const get_Roles = async (role_id, _accessLevels) => {
    return new Promise(async (resolve, reject) => {
      // try {
      //     const level = await this.utilities.checkAccess('App Admin', accessLevels);
      //     if (level !== 'G')
      //         return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
      // } catch (error) {
      //         return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
      // }

      try {
        const q = get_Roles_QUERY(role_id);
        const result = await executeMySQL(q);
        return resolve(result);
      } catch (err) {
        return reject({
          err: err,
          message: "Roles retrieval failed"
        });
      }
    });
  };
