import * as _ from 'lodash';
import { getMyBranchList } from "../../../util/branchList";

export const getCustomerAccounts_QUERY = (accno, ownAccount, level, scopeLevel) => {
    // scopeLevel contains object of branchCode, RegionCode and ZoneCode
    // level contains either G, R, Z or B

    return new Promise((resolve, reject) => {

        let q = `select a.foracid accountnumber,a.acct_name accountname,a.sol_id branchCode,a.ACCT_CRNCY_CODE AS CURRENCY,
            C.SOL_DESC branch,a.acct_mgr_user_id accountmanager,a.cif_id customerid,
            (SELECT schm_desc FROM tbaadm.gsp where gsp.schm_code = a.schm_code) accounttypedesc,
            (select purgeremarks from crmuser.accounts b where orgkey = a.cif_id) bvn ,
            a.schm_type accounttype,decode((select acct_status from tbaadm.cam where cam.acid = a.acid
                union select acct_status from tbaadm.smt where smt.acid=a.acid),'D','DORMANT','I','INACTIVE','A','ACTIVE') status,
            (SELECT free_code_2 FROM tbaadm.gac where gac.acid = a.acid) tranalerts,
                            ((a.CLR_BAL_AMT + a.SANCT_LIM) - (a.LIEN_AMT + a.SYSTEM_RESERVED_AMT)) balnce,
                            a.SANCT_LIM ODLimit,
                            (select  substr(nvl(B.Address_Line1,''),1,50) from crmuser.accounts b where orgkey = a.cif_id) address1,
                            (select  substr(nvl(B.Address_Line2,''),1,50) from crmuser.accounts b where orgkey = a.cif_id) address2,
                            (Select Localetext City From Crmuser.Categories X, Crmuser.Category_Lang Q
                                Where X.Categoryid=Q.Categoryid And Categorytype='CITY'
                            And Value=(select B.city from crmuser.accounts B where orgkey = a.cif_id) And Rownum=1) city,
                             Substr(NVL((Select Localetext State From Crmuser.Categories P, 
                                Crmuser.Category_Lang Q Where P.Categoryid=Q.Categoryid And Categorytype='STATE' 
                                And Value=(select B.State from crmuser.accounts B where orgkey = a.cif_id) And Rownum=1),'LAGOS'),1,15) state,
                            substr((Select Replace(Replace(Replace(Nvl(Phoneno,0),'(',''),')',''),'+234','0') 
                            From Crmuser.Phoneemail Where Orgkey = A.Cif_Id And Phoneoremail='PHONE' And Preferredflag='Y'  
                            and rownum=1),1,15) mobile,
                            (Select Email From Crmuser.Phoneemail Where Orgkey = A.Cif_Id And Phoneoremail='EMAIL' 
                            And Preferredflag='Y'  and rownum=1) email
                            from tbaadm.gam a,tbaadm.sol c
                            where a.sol_id = c.sol_id and c.del_flg = 'N'
                            and a.schm_type in ('SBA','ODA') and a.sol_id <> '900' and cif_id=(select cif_id customerid 
                                from tbaadm.gam where  foracid='${accno}') and a.foracid not in(select accountnumber 
                                    from ExceptionList)`;
        // console.log('level:', level);

        if (ownAccount !== '1') {

            if (level === 'G') {
                return resolve(q);
            } else if (level === 'R' || level === 'Z') {
                // console.log('got here.................:', level);
                getMyBranchList(level, level === 'R' ? scopeLevel.regioncode : scopeLevel.zonecode).then((branches: any[]) => {

                    if (branches.length) {
                        const mybranchlist: any[] = [];
                        _.each(branches, (val, _key) => {
                            mybranchlist.push(val.branchcode);
                        });
                        // console.log('branches:', JSON.stringify(mybranchlist.toString()));
                        q = ` ${q} and a.sol_id in(${mybranchlist.toString()})`;
                        // console.log('q:',q);
                        return resolve(q);
                    } else {
                        return reject({ err: null, message: "No branches found for you!" });
                    }

                }).catch((err) => {
                    return reject({ err: err, message: "No branches found for you!" });
                });

            } else if (level === 'B') {
                q = ` ${q} and a.sol_id='${scopeLevel.branchcode}'`;
                return resolve(q);
            } else {
                return reject('Invalid request');
            }


        } else {
            // console.log('q:', q);
            return resolve(q);
        }

    });
};
