import { checkAccess } from "../../../../util/utility";
import { update_menu_subs_QUERY } from "./query";
import { executeMySQL } from "../../../../db/dbUtil";


export const update_menu_subs = (
    submenu_id: string,
    menu_id: string,
    submenu_name: string,
    submenu_link: string,
    submenu_display_inside: string,
    submenu_order: number,
    favourite_status: string,
    favourite_order: string,
    status: string,
    accessLevels
  ) => {
    return new Promise(async (resolve, reject) => {
      if (
        !submenu_id ||
        !menu_id ||
        !submenu_name ||
        !submenu_link ||
        !submenu_display_inside
      ) {
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
        const q = update_menu_subs_QUERY(
          submenu_id,
          menu_id,
          submenu_name,
          submenu_link,
          submenu_display_inside,
          submenu_order,
          favourite_status,
          favourite_order,
          status
        );

        // console.log('q:', q);

        const result = await executeMySQL(q) as any;
        const success = result.affectedRows === 1 ? true : false;

        return resolve({ success });
      } catch (err) {
        return reject({
          err: err,
          message: "Could not update sub-menu"
        });
      }
    });
  };
