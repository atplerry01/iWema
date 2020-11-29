// MandateByBranchWith
// MandateByProduct

export const getLoanTransQuery = () => {
  // tslint:disable-next-line: max-line-length
  return `select a.acid,foracid, acct_name,acct_cls_flg,schm_desc,DIS_AMT,interest_rate,clr_bal_amt OutstandingAmt,EI_PERD_START_DATE DateApprov,EI_PERD_END_DATE ExpiryDate,acct_cls_date,acct_ownership,
  (EI_PERD_END_DATE-EI_PERD_START_DATE)||' Days' tenor ,tran_date last_paym_date,tran_amt last_paym,tran_id,tran_sub_type, d.flow_amt next_paym,NEXT_DMD_DATE nxt_paym_date
  from tbaadm.gam a, tbaadm.gsp b, tbaadm.lam c, tbaadm.Lrs d, tbaadm.eit e, tbaadm.htd f
  where a.schm_code = b.schm_code and a.acid = d.acid and a.acid = e.entity_id and a.acid = f.acid
  and a.acid = c.acid
  and tran_sub_type ='CI'
  `;
}; //
