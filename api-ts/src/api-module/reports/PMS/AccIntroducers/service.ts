import * as _ from 'lodash';
import { Paginator, compareValues } from "../../../../util/utility";
import { executeFinacleDRQuery } from "../../../../db/dbUtil";
import { getAccIntroducers_QUERY } from "./query";

export const getAccIntroducers = (staffNo, dateFrom, dateTo, accNumber, redis: any,  page = 1, per_page = 100) => {

    return new Promise(async (resolve, reject) => {

        let totalAvgCredit = 0;
         let totalAvgDebit = 0;
         let totalBalance = 0;

        if (!staffNo) {
            return reject({
                err: null,
                message: 'No valid Staff ID provided.'
            });
        }
       
            if (staffNo.substring(0, 1) === 'S') {
                staffNo = staffNo.substring(1);
            }

          // staffNo = '07636';
            const key = `getAccIntroducers${staffNo}${dateFrom}${dateTo}${accNumber}`;
            const keyAvgCr = `getAccIntroducers${staffNo}${dateFrom}${dateTo}${accNumber}keyAvgCr`;
            const keyAvgDr = `getAccIntroducers${staffNo}${dateFrom}${dateTo}${accNumber}keyAvgDr`;
            const keyBal = `getAccIntroducers${staffNo}${dateFrom}${dateTo}${accNumber}keyBal`;

            const getFromCatch = await redis.get(key);
            if (getFromCatch) {

                const data = JSON.parse(getFromCatch);    
                                   
                    totalAvgCredit = await redis.get(keyAvgCr);
                    totalAvgDebit =  await redis.get(keyAvgDr);
                    totalBalance =  await redis.get(keyBal);
            
                  
                const res = await Paginator(data, page, per_page);

                _.set(res, 'totalAvgCredit', totalAvgCredit);
                _.set(res, 'totalAvgDebit', totalAvgDebit);
                _.set(res, 'totalBalance', totalBalance);

                return resolve(res);
            }

            const q = getAccIntroducers_QUERY(staffNo, dateFrom, dateTo, accNumber);

                // console.log('q.....:', q);
                executeFinacleDRQuery(q).then(async (result: any[]) => {

                    if (result && result.length) {
                        try {

                            result.forEach(val => {
                                totalAvgCredit += val.AVERAGE_CREDIT;
                                totalAvgDebit += val.AVERAGE_DEBIT;
                                totalBalance += val.BALANCE;
                            });

                           await result.sort(compareValues('OPENDATE', 'desc'));
                        
                            await redis.set(keyAvgCr, JSON.stringify(totalAvgCredit), "ex", parseInt(process.env.REPORT_EXP_DURATION as string, 10));
                            await redis.set(keyAvgDr, JSON.stringify(totalAvgDebit), "ex", parseInt(process.env.REPORT_EXP_DURATION as string, 10));
                            await redis.set(keyBal, JSON.stringify(totalBalance), "ex", parseInt(process.env.REPORT_EXP_DURATION as string, 10));
                            await redis.set(key, JSON.stringify(result), "ex", parseInt(process.env.REPORT_EXP_DURATION as string, 10));

                            console.log('Redis Insert Okay');

                        } catch (error) {
                            console.log('Redis Insert failed:', error.message);
                        }
                    }

                    const res = await Paginator(result, page, per_page);

                    _.set(res, 'totalAvgCredit', totalAvgCredit);
                    _.set(res, 'totalAvgDebit', totalAvgDebit);
                    _.set(res, 'totalBalance', totalBalance);

                    return resolve(res);

                }).catch(err => {
                    return reject({
                        err: err,
                        message: "Report not available for this search criteria"
                    });
                });

    });
};
