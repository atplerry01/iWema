
import * as _ from 'lodash';
import { getMyBranchList } from "../../../util/branchList";

    // oracle (NB: Suspended for optimization)
    export const getTopCustomersAvgVol_QUERY = (dateFrom, dateTo, level, scopeLevel) => {
        // scopeLevel contains object of branchCode, RegionCode and ZoneCode
        // level contains either G, R, Z or B

        // branchCode=0 => display all (consolidated)
        // console.log('branchCode:', branchCode);
        return new Promise((resolve, reject) => {

            let q = ` select g.foracid AccountNo, g.acct_name AccountName, g.acct_opn_date OpenDate, p.schm_desc, s.sol_desc Branch, 
            nvl(SYSTEM.INT_RATE_CR(g.foracid),0) INT_RATE,  
            g.acct_crncy_code,(custom.getAvgBal_Cr(g.acid,'${dateFrom}','${dateTo}') * CUSTOM.AmountToFC('NOR','${dateTo}',
            g.acct_crncy_code,'NGN')) AVERAGE_DEPOSIT,acct_mgr_user_id AccountMgr, free_code_4                                      
           from tbaadm.gam g, tbaadm.sol s, tbaadm.gsp p, tbaadm.gac c                                     
           where g.schm_code = p.schm_code                                         
           and g.sol_id=s.sol_id                                         
           and p.schm_code = g.schm_code                                        
           and c.acid = g.acid   
           and acct_ownership <>'O' 
           and (custom.getAvgBal_Cr(g.acid,'${dateFrom}','${dateTo}') * CUSTOM.AmountToFC('NOR','${dateTo}',
           g.acct_crncy_code,'NGN')) > '1000000'`;



            // console.log('level:', level);                                 
            if (level === 'G') {
                q = ` ${q} ORDER BY AVERAGE_DEPOSIT DESC`;
                return resolve(q);
            } else if (level === 'R' || level === 'Z') {
                getMyBranchList(level, level === 'R' ? scopeLevel.regioncode : scopeLevel.zonecode).then((branches: any[]) => {

                    if (branches.length) {
                        const mybranchlist: any[] = [];
                        _.each(branches, (val, _key) => {
                            mybranchlist.push(val.branchcode);
                        });

                        q = ` ${q} and g.sol_id in(${mybranchlist.toString()}) ORDER BY AVERAGE_DEPOSIT DESC`;
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
                q = ` ${q} and g.sol_id='${scopeLevel.branchcode}' ORDER BY AVERAGE_DEPOSIT DESC`;
                return resolve(q);
            } else {
                return reject('Invalid request');
            }



        });
    };
