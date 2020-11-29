import { executeMySQL } from "../../../../db/dbUtil";
import { checkAccess } from "../../../../util/utility";
import { update_menu_items_QUERY } from "./query";


export const update_menu_item = (
    idno: number,
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
      if (!idno || !menu_name || !standalone || !menu_display_inside) {
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
        const q = update_menu_items_QUERY(
          idno,
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
        return resolve({ success });
      } catch (err) {
        return reject({
          err: err,
          message: "Could not update menu"
        });
      }
    });
  };
