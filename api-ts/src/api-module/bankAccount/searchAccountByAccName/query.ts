import * as _ from 'lodash';
import { getMyBranchList } from '../../../util/branchList';

export const searchAccountByAccName_QUERY = (accountname: string, level: any, scopeLevel: any) => {
    // scopeLevel contains object of branchCode, RegionCode and ZoneCode
    // level contains either G, R, Z or B


    return new Promise((resolve, reject) => {

        //  accountname = this.dbHelper.mysqlSanitizeInput(accountname);

        let q = `SELECT customerid, acid, accountnumber, accountname FROM FINACLE_ACCOUNTS WHERE MATCH(accountname) AGAINST ('${accountname}' IN NATURAL LANGUAGE MODE)`;
        // console.log('level:', level);

        if (level === 'G') {
            return resolve(q);
        } else if (level === 'R' || level === 'Z') {
            getMyBranchList(level, level === 'R' ? scopeLevel.regioncode : scopeLevel.zonecode).then((branches: any[]) => {

                if (branches.length) {
                    const mybranchlist: any[] = [];
                    _.each(branches, (val, _key) => {
                        mybranchlist.push(val.branchcode);
                    });

                    q = ` ${q} and sol_id in(${mybranchlist.toString()})`;
                    // console.log('q:', q);
                    return resolve(q);
                } else {
                    return reject({ err: null, message: "No branches found for you!" });
                }

            }).catch((err) => {
                return reject({ err: err, message: "No branches found for you!" });
            });

        } else if (level === 'B') {
            q = ` ${q} and sol_id='${scopeLevel.branchcode}'`;
            return resolve(q);
        } else {
            return reject('Invalid request');
        }

    });

};
