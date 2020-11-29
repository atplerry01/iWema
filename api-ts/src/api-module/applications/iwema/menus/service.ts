import { Paginator } from "../../../../util/utility";
import { get_menu_items_QUERY } from "./query";
import { executeMySQL } from "../../../../db/dbUtil";

export const  get_menu_items = (name, _accessLevels, page, per_page) => {
    return new Promise( (resolve, reject) => {
      // try {
      //     const level = await this.utilities.checkAccess('App Admin', accessLevels);
      //     if (level !== 'G')
      //         return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
      // } catch (error) {
      //         return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
      // }

      const q = get_menu_items_QUERY(name);

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
