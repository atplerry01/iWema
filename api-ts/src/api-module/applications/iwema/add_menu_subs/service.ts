import * as shortid from "shortid";
import { checkAccess } from "../../../../util/utility";
import { insert_menu_subs_QUERY } from "./query";
import { executeMySQL } from "../../../../db/dbUtil";


export const add_menu_subs = (
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
        const submenu_id = shortid.generate();
        const q = insert_menu_subs_QUERY(
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

        //    console.log('q:', q);

        const result = await executeMySQL(q) as any;

        const success = result.affectedRows === 1 ? true : false;
        const idno = success ? result.insertId : null;

        return resolve({ success, idno, submenu_id });
      } catch (err) {
        return reject({
          err: err,
          message: "Could not add sub-menu"
        });
      }
    });
  };
