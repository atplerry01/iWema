import { executeFinacleLiveQuery } from "../../../db/dbUtil";
import { getAccountStatementDetail_QUERY, getAccountStatement_QUERY } from "./query";

export const getAccountStatement = (accno, datefrom, dateto, adddetail) => {
    return new Promise((resolve, reject) => {
      if (!accno || !datefrom || !dateto) {
        return reject({
          err: null,
          message: "Account Number, DateFrom and DateTo are required!"
        });
      }

      const q = getAccountStatement_QUERY(
        accno,
        datefrom,
        dateto
      );

      let detail: object = {};

      if (adddetail === '1') { 
        const dq = getAccountStatementDetail_QUERY(accno);

      executeFinacleLiveQuery(dq).then((result: any[]) => { 
         detail = result[0];        
      })
      .catch(err => {
        return reject({
          err: err,
          message: "Could not retrieve account statement"
        });
      });
    }



      executeFinacleLiveQuery(q).then((result: any[]) => {   
        if (adddetail !== '1') {     
            return resolve(result);
        }
        const printingCost = result.length ? (Math.ceil(result.length / 50) + 1) * Number(process.env.printingCost) : 0;
        return resolve({statements: result, detail, printingCost});
      })
      .catch(err => {
        return reject({
          err: err,
          message: "Could not retrieve account statement"
        });
      });

  

    });


  };
