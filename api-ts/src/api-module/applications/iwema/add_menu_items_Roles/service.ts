import * as shortid from "shortid";
import { checkAccess } from "../../../../util/utility";
import { insert_menu_items_Roles_QUERY } from "./query";
import { executeMySQL } from "../../../../db/dbUtil";

export const add_menu_items_Roles = (
  roleid: string,
    submenu_id: string,
    access_level_id: string,
    status: string,
    accessLevels
  ) => {
    return new Promise(async (resolve, reject) => {
      if (!submenu_id || !access_level_id) {
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
        const id = roleid === 'GENERAL' ? roleid : shortid.generate();
        const q = insert_menu_items_Roles_QUERY(
          id,
          submenu_id,
          access_level_id,
          status
        );

        const result = await executeMySQL(q) as any;

        const success = result.affectedRows === 1 ? true : false;
        const idno = success ? result.insertId : null;

        return resolve({ success, idno, roleid });
      } catch (err) {
        return reject({
          err: err,
          message: "Could not add menu role"
        });
      }
    });
  };
