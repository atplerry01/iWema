// MandateByBranchWith
// MandateByProduct

export const getInduceTransactionQuery = () => {
  // tslint:disable-next-line: max-line-length
  return `select Account_No,acct_name,Currency,tran_date,tran_id,tran_sub_type,part_tran_type,value_date,tran_amt,NairaEQV,tran_particular, phoneno,email from
  (select foracid Account_No,acct_name,ACCT_CRNCY_CODE Currency, tran_date,tran_id,tran_sub_type,part_tran_type,value_date,
  tran_amt,tran_amt* CUSTOM.AmountToFC('NOR',tran_date,a.acct_crncy_code,'NGN')NairaEQV,tran_particular
  from tbaadm.gam a, tbaadm.htd b
  where a.acid = b.acid
  and foracid not like 'ZZ%'
  and acct_ownership <> 'O'
  and acct_cls_flg = 'N'
  and a.del_flg = 'N'
  and tran_sub_type not in ('BI','IP','IC','SC')
  and entity_cre_flg = 'Y'
  and PSTD_FLG ='Y') p
  
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
  on u.foracid = p.Account_No`;
}; //
