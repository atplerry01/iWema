import * as _ from 'lodash';
import { isValidAccountNo, isValidBranchCode } from "../../../util/validations";
import { getMyBranchList } from "../../../util/branchList";

 // oracle
export const getPartLiquidatedFixedDeposit_QUERY = (dateType, startDate, endDate, accountNo, branchCode, status, level, scopeLevel) => {
    // scopeLevel contains object of branchCode, RegionCode and ZoneCode
    // level contains either G, R, Z or B

    // branchCode=0 => display all (consolidated)
    // console.log('branchCode:', branchCode);
    return new Promise((resolve, reject) => {

        let q = `select 
        g.foracid ACCOUNTNO,
        g.acid ENTITYID,
        g.acct_name,
        m.foracid part_close,
        g.sol_id BRANCHCODE,
        g.acct_opn_date DEAL_DATE,
        original_deposit_amount Init_PRINCIPAL_AMT,
        part_close_amt,
        maturity_date,
        part_close_date,
        g.acct_cls_date,
        deposit_period_days TENOR,
        decode(closure_type,'P','Pre-Liquidation','Part-Liquidation') Status,
        tran_date_bal bal_after_part_Liquidation,
        t.lchg_user_id verifier,maturity_date-part_close_date remaining_tenor,system.int_rate_cr(g.foracid) INTERESTRATE,
        s.sol_desc BRANCHNAME,
        (select emp_name from tbaadm.get where emp_id =(select user_id from tbaadm.upr where user_id= g.acct_mgr_user_id and rownum = 1)) ACCT_OFFICER
        from tbaadm.tam t,tbaadm.gam g,tbaadm.gam m,tbaadm.tph p,tbaadm.eab e,tbaadm.sol s
        where t.acid=p.acid
        and t.acid=g.acid
        and m.acid=t.repayment_acid(+)
        and eod_date <= part_close_date
        and t.acid=e.acid
        and s.sol_id = g.sol_id
        and end_eod_date >= part_close_date
        and decode(closure_type,'P','Pre-Liquidation','Part-Liquidation')  = '${status}'`;

        switch (dateType) {
            case 'pldate': // Part_Liquidated_Date
                q = `${q} and part_close_date between '${startDate}' and '${endDate}'`;
                break;
            case 'mdate': // Maturity_Date
                q = `${q} and  maturity_date between '${startDate}' and '${endDate}'`;
                break;            
           default: // DEAL_DATE
                q = `${q} and  g.acct_opn_date between '${startDate}' and '${endDate}'`;
                break;
        }

        if (isValidAccountNo(accountNo)) {
            q = ` ${q} and  g.foracid='${accountNo}'`;
        }

        if (isValidBranchCode(branchCode) && level !== 'B') {
            q = ` ${q} and g.sol_id='${branchCode}'`;
        }

        // console.log('level:', level);                                 
        if (level === 'G') {
            q = `${q}  order by g.foracid, part_close_date`;
            return resolve(q);
        } else if (level === 'R' || level === 'Z') {
            getMyBranchList(level, level === 'R' ? scopeLevel.regioncode : scopeLevel.zonecode).then((branches: any[]) => {

                if (branches.length) {
                    const mybranchlist: any[] = [];
                    _.each(branches, (val, _key) => {
                        mybranchlist.push(val.branchcode);
                    });

                    q = ` ${q} and d.sol_id in(${mybranchlist.toString()})  order by g.foracid,part_close_date`;
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
            q = ` ${q} and d.sol_id='${scopeLevel.branchcode}'  order by g.foracid,part_close_date`;
            return resolve(q);
        } else {
            return reject('Invalid request');
        }

    });
};
