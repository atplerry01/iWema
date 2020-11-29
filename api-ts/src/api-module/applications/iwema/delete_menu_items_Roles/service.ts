import { checkAccess } from "../../../../util/utility";
import { delete_menu_items_Roles_QUERY } from "./query";
import { executeMySQL } from "../../../../db/dbUtil";


export const delete_menu_items_Roles = (idno: number, accessLevels) => {
    return new Promise(async (resolve, reject) => {
      if (!idno) {
        return reject({ err: "", message: "Id is required" });
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
        const q = delete_menu_items_Roles_QUERY(idno);

        const result = await executeMySQL(q) as any;
        const success = result.affectedRows === 1 ? true : false;
        return resolve({ success });
      } catch (err) {
        return reject({
          err: err,
          message: "Could not delete menu role"
        });
      }
    });
  };
