import { checkAccess } from "../../../../util/utility";
import { update_menu_items_Roles_QUERY } from "./query";
import { executeMySQL } from "../../../../db/dbUtil";


export const update_menu_items_Roles = (
    idno: number,
    roleid: string,
    access_level_id: string,
    status: string,
    accessLevels
  ) => {
    return new Promise(async (resolve, reject) => {
      if (!idno || !roleid || !access_level_id) {
        return reject({ err: "", message: "Fill all required fields" });
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
        const q = update_menu_items_Roles_QUERY(
          idno,
          roleid,
          access_level_id,
          status
        );

        const result = await executeMySQL(q) as any;
        const success = result.affectedRows === 1 ? true : false;
        return resolve({ success });
      } catch (err) {
        return reject({
          err: err,
          message: "Could not update menu role"
        });
      }
    });
  };
