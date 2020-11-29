import { Paginator, checkAccess } from "../../../../util/utility";
import { getTopDepositors_QUERY } from "./query";
import { executeFinacleDRQuery } from "../../../../db/dbUtil";



export const getTopDepositors = (staffId, reportType, branchCode, _date, accessLevels, scopeLevel, redis: any,  page = 1, per_page = 100,  _export = null) => {

    return new Promise(async (resolve, reject) => {

        if (!reportType || !_date) {
            return reject({
                err: null,
                message: 'Please, both Report type and date are required'
            });
        }


        const level = await checkAccess('Top Depositors', accessLevels);
        if (!level) {
            return reject({
                err: "",
                message: "Access Denied. Unauthorized User"
            });
        }

        const key = `TopDepositorsReport${staffId}${reportType}${_date}${branchCode}`;
        const getfromCatch = await redis.get(key);
        if (getfromCatch) {
            console.log('got from catch.....:');
            const data = await JSON.parse(getfromCatch);


            if (_export === '1') {
                return resolve(data);
            }

            const res = await Paginator(data, page, per_page);

            return resolve(res);
        }

        getTopDepositors_QUERY(staffId, reportType, branchCode, _date, level, scopeLevel).then(q => {
            //  console.log('q.....:', q);
             executeFinacleDRQuery(q).then(async (result: any[]) => {

                 if (result && result.length) {
                     try {
                         await redis.set(key, JSON.stringify(result), "ex", parseInt(process.env.REPORT_EXP_DURATION as string, 10));
                         console.log('Redis Insert Okay');

                     } catch (error) {
                         console.log('Redis Insert failed:', error.message);
                     }
                 }

                 const res = await Paginator(result, page, per_page);
                 return resolve(res);
             }).catch(err => {
                 return reject({
                     err: err,
                     message: "Report not available for this search criteria"
                 });
             });

         }).catch(err => {

             return reject({
                 err: err,
                 message: "Something went wrong..."
             });
         });


    });
};
