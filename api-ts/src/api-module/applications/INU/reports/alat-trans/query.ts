// MandateByBranchWith
// MandateByProduct

export const getAlatTransQuery = () => {
  // tslint:disable-next-line: max-line-length
  return `select Cif_id, sol_id,acct_ownership,Account_closed,Account_Deleted,sol_desc, Account_Name, Account_No, Date_Opened,schm_code,Product,ACCOUNT_STATUS,prev_acct_status,acct_status_date,Restriction,
  Reason,last_tran_date,Currency, CurrBal,Curr_NairaBal,YstdBalNairEQV,TwoDaysBalNairEQV, gender, DOB,  Address,phoneno,email from
  ( select  a.Cif_id,acct_ownership,acct_cls_flg Account_closed,a.del_flg Account_Deleted,a.sol_id, b.sol_desc, a.acct_name Account_Name,a.foracid Account_No,Acct_opn_date Date_Opened,
          a.schm_code,schm_desc Product,decode(acct_status,'D','DORMANT','I','INACTIVE','A','ACTIVE') ACCOUNT_STATUS,prev_acct_status,acct_status_date,
          last_tran_date,ACCT_CRNCY_CODE Currency,clr_bal_amt CurrBal,clr_bal_amt* CUSTOM.AmountToFC('NOR',sysdate,a.acct_crncy_code,'NGN')Curr_NairaBal, gender, cust_dob DOB, address_line1 Address
          from tbaadm.gam a, tbaadm.sol b, tbaadm.gsp j, tbaadm.cam zz, crmuser.accounts d
          where a.sol_id=b.sol_id
          and j.schm_code = a.schm_code
          and zz.acid = a.acid
          and a.cif_id = d.orgkey
          and foracid not like 'ZZ%'
          and acct_ownership <> 'O'
          union all
    select  a.Cif_id,acct_ownership,acct_cls_flg Account_closed,a.del_flg Account_Deleted,a.sol_id, b.sol_desc, a.acct_name Account_Name,a.foracid Account_No,Acct_opn_date Date_Opened,
          a.schm_code,schm_desc Product,decode(acct_status,'D','DORMANT','I','INACTIVE','A','ACTIVE') ACCOUNT_STATUS,prev_acct_status,acct_status_date,last_tran_date,ACCT_CRNCY_CODE Currency,clr_bal_amt CurrBal,
          clr_bal_amt* CUSTOM.AmountToFC('NOR',sysdate,a.acct_crncy_code,'NGN')NairaBal, gender, cust_dob DOB, address_line1 Address
          from tbaadm.gam a, tbaadm.sol b, tbaadm.gsp j, tbaadm.smt zz,crmuser.accounts d
          where a.sol_id=b.sol_id
          and j.schm_code = a.schm_code
          and zz.acid = a.acid
          and a.cif_id = d.orgkey
          and foracid not like 'ZZ%'
          and acct_ownership <> 'O') p
          
     left join
  (select a.foracid , phoneno
  from tbaadm.gam a, CRMUSER.phoneemail c
  where a.cif_id = c.orgkey
  AND phoneoremail = 'PHONE') i
  on i.foracid = p.Account_No
  
  left join
  (select a.foracid , email
  from tbaadm.gam a, CRMUSER.phoneemail c
  where a.cif_id = c.orgkey
  AND phoneoremail = 'EMAIL') u
  on u.foracid = p.Account_No 
  left join
  (select a.foracid,a.frez_code Restriction,b.ref_desc Reason
  from tbaadm.gam a, tbaadm.rct b
  where a.FREZ_REASON_CODE = b.REF_CODE
  and ref_rec_type='31'
  and  a.foracid not like 'ZZ%'
  and acct_ownership <> 'O'
  and a.del_flg = 'N') m
  on p.Account_No = m.foracid
  left join
  (select foracid,tran_date_bal*CUSTOM.AmountToFC('NOR',trunc(sysdate-1,'DD'),a.acct_crncy_code,'NGN') YstdBalNairEQV
  from tbaadm.gam a ,tbaadm.eab b where a.ACID = b.acid
  and eod_date<= trunc(sysdate-1,'DD') and end_eod_date>= trunc(sysdate-1,'DD') )t
  on p.Account_No = t.foracid
  left join
  (select foracid,tran_date_bal*CUSTOM.AmountToFC('NOR',trunc(sysdate-2,'DD'),a.acct_crncy_code,'NGN') TwoDaysBalNairEQV
  from tbaadm.gam a ,tbaadm.eab b where a.ACID = b.acid
  and eod_date<= trunc(sysdate-2,'DD') and end_eod_date>= trunc(sysdate-2,'DD') ) x
  on p.Account_No = x.foracid
  `;
}; //
