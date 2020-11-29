import { checkAccess } from "../../../../util/utility";
import { executeMySQL } from "../../../../db/dbUtil";
import { insert_menu_items_SpecialRoles_QUERY } from "./query";

export const add_menu_items_SpecialRoles = (
    userid: string,
    submenu_id: string,
    access_level_id: string,
    status: string,
    accessLevels
  ) => {
    return new Promise(async (resolve, reject) => {
      if (!userid || !submenu_id || !access_level_id) {
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
        const q = insert_menu_items_SpecialRoles_QUERY(
          userid,
          submenu_id,
          access_level_id,
          status
        );

        const result = await executeMySQL(q) as any;

        const success = result.affectedRows === 1 ? true : false;
        const idno = success ? result.insertId : null;

        return resolve({ success, idno });
      } catch (err) {
        return reject({
          err: err,
          message: "Could not add special role"
        });
      }
    });
  };
