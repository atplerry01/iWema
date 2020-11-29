import { get_menu_items_Roles_QUERY, get_menu_items_SpecialRoles_QUERY } from "./query";
import { executeMySQL } from "../../../../db/dbUtil";

export const get_menu_items_Roles = async(submenu_id, _accessLevels) => {
    return new Promise(async (resolve, reject) => {
      if (!submenu_id) {
        return reject({ err: "", message: "Menu ID is required" });
      }

      // try {
      //     const level = await this.utilities.checkAccess('App Admin', accessLevels);
      //     if (level !== 'G')
      //         return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
      // } catch (error) {
      //         return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
      // }

      try {
        const q = get_menu_items_Roles_QUERY(submenu_id);
        const qs = get_menu_items_SpecialRoles_QUERY(submenu_id);

        const roles = await executeMySQL(q);
        const specialRoles = await executeMySQL(qs);

        const result = { roles, specialRoles };

        return resolve(result);
      } catch (err) {
        return reject({
          err: err,
          message: "Roles claims retrieval failed"
        });
      }
    });
  };
