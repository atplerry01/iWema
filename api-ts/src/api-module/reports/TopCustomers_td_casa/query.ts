import * as _ from 'lodash';
import { getMyBranchList } from "../../../util/branchList";

 // oracle
 export const getTopCustomers_TD_CASA_QUERY = (reportType, selectedDate, branchCode, level, scopeLevel) => {
    // scopeLevel contains object of branchCode, RegionCode and ZoneCode
    // level contains either G, R, Z or B

    // branchCode=0 => display all (consolidated)
    // console.log('branchCode:', branchCode);
    return new Promise((resolve, reject) => {

        let q = `select *   
            from (select foracid accountnumber, acct_name customername, sol_desc branch, clr_bal_amt clearedbalance,tran_date_bal,
                  acct_crncy_code currency,eod_date,END_EOD_DATE from tbaadm.gam g, tbaadm.sol s,tbaadm.eab e ,tbaadm.gac f
                 where g.sol_id=s.sol_id
                 and g.acid=e.acid  and g.acid = f.acid
                 and  END_EOD_DATE >= '${selectedDate}' and eod_date <= '${selectedDate}'
                 and g.del_flg='N'
                 and (free_code_8 NOT in ('CBGRP','PSGRP') or free_code_8 is null)`;

        if (reportType === 'casa') {
            q = `${q} and schm_type in ('ODA','SBA')`;
        } else if (reportType === 'td') {
            q = `${q} and schm_type in ('TDA','CAA')`;
               }

        if (branchCode !== '0' && level !== 'B') {
            q = ` ${q} and g.sol_id='${branchCode}'`;
        }

        // console.log('level:', level);                                 
        if (level === 'G') {
            q = `${q}  and rownum <= 20 order by tran_date_bal desc)`;
            return resolve(q);
        } else if (level === 'R' || level === 'Z') {
             getMyBranchList(level, level === 'R' ? scopeLevel.regioncode : scopeLevel.zonecode).then((branches: any[]) => {

                if (branches.length) {
                    const mybranchlist: any[] = [];
                    _.each(branches, (val, _key) => {
                        mybranchlist.push(val.branchcode);
                    });

                    q = ` ${q} and g.sol_id in(${mybranchlist.toString()})  and rownum <= 20 order by tran_date_bal desc)`;
                    return resolve(q);
                } else {
                    return reject({
                        err: null,
                        message: "No branches found for you!"
                    });
                }

            }).catch((err) => {
                return reject({
                    err: err,
                    message: "No branches found for you!"
                });
            });

        } else if (level === 'B') {
            q = ` ${q} and g.sol_id='${scopeLevel.branchcode}'  and rownum <= 20 order by tran_date_bal desc)`;
            return resolve(q);
        } else {
            return reject('Invalid request');
        }



    });
};
