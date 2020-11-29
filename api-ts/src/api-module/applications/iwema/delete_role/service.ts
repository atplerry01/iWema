import { checkAccess } from "../../../../util/utility";
import { delete_Roles_QUERY } from "./query";
import { executeMySQL } from "../../../../db/dbUtil";


export const delete_role = (roleid: string, accessLevels) => {
    return new Promise(async (resolve, reject) => {
      if (!roleid) {
        return reject({ err: "", message: "role Id is required" });
      }

      try {
        const level = await checkAccess(
          "App Admin",
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
        const q = delete_Roles_QUERY(roleid);

        const result = await executeMySQL(q) as any;
        const success = result.affectedRows === 1 ? true : false;
        return resolve({ success });
      } catch (err) {
        return reject({
          err: err,
          message: "Could not delete role"
        });
      }
    });
  };
