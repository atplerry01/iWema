import { get_menu_subs_QUERY } from "./query";
import { executeMySQL } from "../../../../db/dbUtil";
import { Paginator } from "../../../../util/utility";

export const get_menu_subs = async(menu_id, name, _accessLevels, page, per_page) => {
    return new Promise(async (resolve, reject) => {
      if (!menu_id) {
        return reject({ err: "", message: "Parent Menu ID is required" });
      }

      // try {
      //     const level = await this.utilities.checkAccess('App Admin', accessLevels);
      //     if (level !== 'G')
      //         return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
      // } catch (error) {
      //         return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
      // }

      const q = get_menu_subs_QUERY(menu_id, name);

      executeMySQL(q)
        .then(async(result) => {
          const res = await Paginator(result, page, per_page);
          return resolve(res);
        })
        .catch(err => {
          return reject({
            err: err,
            message: "Report not available for this search criteria"
          });
        }); // end of execution
    });
  };
