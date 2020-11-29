import * as _ from "lodash";
import { Paginator, checkAccess } from "../../../util/utility";
import { getCallOver_QUERY } from "./query";
import { executeFinacleDRQuery } from "../../../db/dbUtil";

export const getCallOver = async (staffId, selectedDate, branchCode, accessLevels, scopeLevel, redis: any, page = 1, per_page = 100, filterUserId = null, _export = null) => {

    return new Promise(async (resolve, reject) => {

        if (!selectedDate) {
            return reject({
                err: null,
                message: 'Please select date range'
            });
        }

        const baseKey = `CallOver${staffId}${selectedDate}${branchCode}`;
        let totalCredit = 0;
        let totalDebit = 0;

        let callOversfromCatch = await redis.get(baseKey);
        if (callOversfromCatch) {
           
            callOversfromCatch = await JSON.parse(callOversfromCatch);

            totalCredit = await redis.get(`${baseKey}totalCredit`);
            totalDebit = await redis.get(`${baseKey}totalDebit`);

            let tellers = await redis.get(`${baseKey}tellers`);
            if (tellers) {
                tellers = JSON.parse(tellers);
            }

            if (filterUserId) {
                callOversfromCatch = callOversfromCatch.filter(x => x.ENTRY_USER_ID === filterUserId);
                if (_export === '1') {
                    return resolve(callOversfromCatch);
                }

                let _totalCredit = 0.00;
                let _totalDebit = 0.00;
                callOversfromCatch.forEach(val => {
                    _totalCredit += val.CREDIT;
                    _totalDebit += val.DEBIT;
                });

                totalCredit = _totalCredit;
                totalDebit = _totalDebit;
            }

            if (_export === '1') {
                return resolve(callOversfromCatch);
            }

            const res = await Paginator(callOversfromCatch, page, per_page);


            _.set(res, 'totalCredit', totalCredit);
            _.set(res, 'totalDebit', totalDebit);
            _.set(res, 'tellers', tellers);


            return resolve(res);
        }

        checkAccess('Callover', accessLevels).then(level => {

            getCallOver_QUERY(staffId, selectedDate, branchCode, level, scopeLevel).then(q => {
                //  console.log('q.....:', q);
                // console.log('sending query...');
                executeFinacleDRQuery(q).then(async (result: any[]) => {
                    console.log('received response from oracle');

                    if (result.length > 0) {
                        const tellers: any[] = [];
                        result.forEach(val => {
                            totalCredit += val.CREDIT;
                            totalDebit += val.DEBIT;

                            if (tellers.indexOf(val.ENTRY_USER_ID) === -1) {
                                tellers.push(val.ENTRY_USER_ID);
                            }
                        });
                        // console.log('got from db.....:2');      

                        try {
                            await redis.set(baseKey, JSON.stringify(result), "ex", 60 * 30); // store for 30 min
                            await redis.set(`${baseKey}totalCredit`, JSON.stringify(totalCredit), "ex", 60 * 30);
                            await redis.set(`${baseKey}totalDebit`, JSON.stringify(totalDebit), "ex", 60 * 30);
                            await redis.set(`${baseKey}tellers`, JSON.stringify(tellers), "ex", 60 * 30);

                            console.log('Redis Insert Okay');

                        } catch (error) {
                            console.log('Redis Insert failed:', error.message);
                        }

                        const res = await Paginator(result, page, per_page);
                        _.set(res, 'totalCredit', totalCredit);
                        _.set(res, 'totalDebit', totalDebit);
                        _.set(res, 'tellers', tellers);


                        return resolve(res);
                    } else {
                        return resolve(result);
                    }

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

        }).catch(err => {
            return reject({
                err: err,
                message: "Access Denied. Unauthorized User"
            });
        });

    });
};
