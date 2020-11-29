import * as _ from 'lodash';
import { getMyBranchList } from "../../../util/branchList";
import { isValidAccountNo, isValidBranchCode } from '../../../util/validations';

 // oracle
 export const getFixedDeposit_QUERY = (startDate, endDate, accountNo, branchCode, level, scopeLevel) => {
    // scopeLevel contains object of branchCode, RegionCode and ZoneCode
    // level contains either G, R, Z or B

    // branchCode=0 => display all (consolidated)
    // console.log('branchCode:', branchCode);
    return new Promise((resolve, reject) => {

        let q = `select distinct g.schm_code, gsp.schm_desc as ProductName, 
        LTRIM(sol.sol_desc) BranchName,g.sol_id BRANCHCODE, foracid ACCOUNTNO,g.cif_id CustomerID,acct_name CustomerName, 
        Acct_Opn_Date DateOpened,deposit_period_days TENOR, deposit_period_mths, ((deposit_period_mths*30)+ deposit_period_days) True_Tenor,
        maturity_date MATURITYDATE, acct_crncy_code,deposit_amount DEPOSITAMOUNT,system.int_rate_cr(foracid) INTERESTRATE, 
        ((SELECT NRMl_BOOKED_AMOUNT_CR-NRML_INTEREST_AMOUNT_CR FROM TBAADM.EIT WHERE ENTITY_ID=g.acid) + deposit_amount) clearedbalance, 
        (SELECT NRMl_BOOKED_AMOUNT_CR-NRML_INTEREST_AMOUNT_CR FROM TBAADM.EIT WHERE ENTITY_ID=g.acid) InterestPayable, Last_Tran_Date ,acct_cls_date,
        decode((select distinct 1 from tbaadm.tph where acid=g.acid and closure_type='P'),1,'Pre-Liquidation',
        decode((select distinct 1 from tbaadm.tph where acid=g.acid and closure_type='H'),1,'Part-Liquidation',
        decode(acct_cls_date,null,'Active','Matured'))) "DepositStatus"
        from tbaadm.tam,tbaadm.gam g,tbaadm.itc, tbaadm.sol, tbaadm.gsp where tam.acid=g.acid 
        and itc.entity_id = g.acid and g.sol_id = sol.sol_id and Acct_Opn_Date between '${startDate}' and '${endDate}'
        and g.schm_code = gsp.schm_code and g.DEL_FLG ='N' AND ACCT_CLS_FLG = 'N' AND g.schm_type = 'TDA'`;

        if (isValidAccountNo(accountNo)) {
            q = ` ${q} and foracid='${accountNo}'`;
        }

        if (isValidBranchCode(branchCode) && level !== 'B') {
            q = ` ${q} and g.sol_id='${branchCode}'`;
        }

        // console.log('level:', level);                                 
        if (level === 'G') {
            q = `${q}  order by Branchname, Acct_Opn_Date desc`;
            return resolve(q);
        } else if (level === 'R' || level === 'Z') {
            getMyBranchList(level, level === 'R' ? scopeLevel.regioncode : scopeLevel.zonecode).then((branches: any[]) => {

                if (branches.length) {
                    const mybranchlist: any[] = [];
                    _.each(branches, (val, _key) => {
                        mybranchlist.push(val.branchcode);
                    });

                    q = ` ${q} and g.sol_id in(${mybranchlist.toString()})  order by Branchname, Acct_Opn_Date desc`;
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
            q = ` ${q} and g.sol_id='${scopeLevel.branchcode}'  order by  Branchname, Acct_Opn_Date desc`;
            return resolve(q);
        } else {
            return reject('Invalid request');
        }

    });
};
