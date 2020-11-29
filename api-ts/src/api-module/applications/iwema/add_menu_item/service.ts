import * as shortid from "shortid";
import { checkAccess } from "../../../../util/utility";
import { executeMySQL } from "../../../../db/dbUtil";
import { insert_menu_items_QUERY } from "./query";

export const add_menu_item = (
    menu_name: string,
    menu_order: number,
    menu_image: string,
    menu_link: string,
    standalone: string,
    status: string,
    menu_display_inside: string,
    accessLevels
  ) => {
    return new Promise(async (resolve, reject) => {
      if (!menu_name || !standalone || !menu_display_inside) {
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
        const menu_id = shortid.generate();
        const q = insert_menu_items_QUERY(
          menu_id,
          menu_name,
          menu_order,
          menu_image,
          menu_link,
          standalone,
          status,
          menu_display_inside
        );

        const result = await executeMySQL(q) as any;

        const success = result.affectedRows === 1 ? true : false;
        const idno = success ? result.insertId : null;

        return resolve({ success, idno, menu_id });
      } catch (err) {
        return reject({
          err: err,
          message: "Could not add menu"
        });
      }
    });
  };
