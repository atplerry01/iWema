import * as _ from 'lodash';
import { getMyBranchList } from "../../../../util/branchList";

export const getTopDepositors_QUERY = (staffId, reportType, branchCode, _date, level, scopeLevel) => {
    // scopeLevel contains object of branchCode, RegionCode and ZoneCode
    // level contains either G, R, Z or B

    // branchCode=0 => display all (consolidated)
    // console.log('branchCode:', branchCode);
    return new Promise((resolve, reject) => {

        let q = ` select foracid Acct_number,acct_name, 
        (tran_date_bal * CUSTOM.AmountToFC('NOR','${_date}',acct_crncy_code,'NGN')) BALANCE,
        Acct_crncy_code CURRENCY_TYPE, schm_desc ACCT_TYPE,acct_mgr_user_id ACC_MGR                                         
        from tbaadm.gam,tbaadm.sol,tbaadm.eab, tbaadm.gsp                                                 
        where gam.sol_id=sol.sol_id                                                 
        and gam.acid=eab.acid   
        and gam.schm_code = gsp.schm_code
        and acct_ownership<>'O'  
        and eod_date <='${_date}' and end_eod_date >='${_date}'`;


        if ( reportType === 'c') { // CASA
            q = `${q} and gam.schm_type in ('SBA','ODA','CAA','TUA') 
            and schm_desc not like 'CALL%'`;
        } else { // TOP TENURED DEPOSIT
            q = `${q} and gam.schm_type in ('TDA','CAA') 
            and schm_desc not like 'DOMIC%'`;
        }

        // console.log('level:', level);                                 
        if (level === 'G') {

            if (branchCode) {
                q = ` ${q} and gam.sol_id='${branchCode}'`;
            }
            q = ` ${q} and (tran_date_bal * CUSTOM.AmountToFC('NOR','${_date}',acct_crncy_code,'NGN')) >= '1000000' 
                    order by (tran_date_bal * CUSTOM.AmountToFC('NOR','${_date}',acct_crncy_code,'NGN')) desc`;
            return resolve(q);
        } else if (level === 'R' || level === 'Z') {
            getMyBranchList(level, level === 'R' ? scopeLevel.regioncode : scopeLevel.zonecode).then((branches: any[]) => {

                if (branches.length) {
                    const mybranchlist: any[] = [];
                    _.each(branches, (val, _key) => {
                        mybranchlist.push(val.branchcode);
                    });

                    if (branchCode) {
                        q = ` ${q} and gam.sol_id='${branchCode}'`;
                    }

                    q = ` ${q} and gam.sol_id in(${mybranchlist.toString()}) `;
                    q = ` ${q} and (tran_date_bal * CUSTOM.AmountToFC('NOR','${_date}',acct_crncy_code,'NGN')) >= '1000000' 
                    order by (tran_date_bal * CUSTOM.AmountToFC('NOR','${_date}',acct_crncy_code,'NGN')) desc`;

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
            q = ` ${q} and gam.sol_id='${scopeLevel.branchcode}'`;
            q = ` ${q} and (tran_date_bal * CUSTOM.AmountToFC('NOR','${_date}',acct_crncy_code,'NGN')) >= '1000000' 
            order by (tran_date_bal * CUSTOM.AmountToFC('NOR','${_date}',acct_crncy_code,'NGN')) desc`;

            return resolve(q);
        }  else if (level === 'S') {
        q = ` ${q} and acct_mgr_user_id='${staffId}'`;
        q = ` ${q} and (tran_date_bal * CUSTOM.AmountToFC('NOR','${_date}',acct_crncy_code,'NGN')) >= '1000000' 
        order by (tran_date_bal * CUSTOM.AmountToFC('NOR','${_date}',acct_crncy_code,'NGN')) desc`;

        return resolve(q);
        } else {
            return reject('Invalid request');
        }



    });
};

