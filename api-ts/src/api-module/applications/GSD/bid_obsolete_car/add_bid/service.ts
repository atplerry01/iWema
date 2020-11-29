
import { insert_absolete_car_bid_QUERY } from "./query";
import { executeMySQL } from "../../../../../db/dbUtil";
import { isAllowed } from "../shared";

  
  export const bid_obsolete_cars = (
    email: string,
    staffid: string,
    obsoleteCarId: string,
    amount: number,
    grade: string,
    staffname: string,
    branchdept: string
  ) => {
    return new Promise(async (resolve, reject) => {
      if (!isAllowed(grade)) {
        return reject({
          err: null,
          message: "Access Denied. Unauthorized User"
        });
      }

      if (!obsoleteCarId || !amount) {
        return reject({ err: "", message: "Fill all required fields" });
      }

      try {
        const q = insert_absolete_car_bid_QUERY(
          email,
          staffid,
          obsoleteCarId,
          amount,
          staffname,
          grade,
          branchdept
        );

        const result = await executeMySQL(q) as any;
        // console.log(result);

        const success = result.affectedRows === 1 ? true : false;

        return resolve({ success, message: "Bid Successful" });
      } catch (err) {
        const message =
          err.code === "ER_DUP_ENTRY"
            ? "Sorry you can bid for only one vehicle."
            : "Bid failed.";
        return reject({
          err: err,
          message
        });
      }
    });
  };
