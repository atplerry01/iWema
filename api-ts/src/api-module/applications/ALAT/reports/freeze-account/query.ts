// MandateByBranchWith
// MandateByProduct

export const getFreezeAccountQuery = (accountNumber: any) => {
  // tslint:disable-next-line: max-line-length
  return `select foracid acct_no, acct_name,FREZ_CODE, decode(schm_type,'ODA','CURRENT','SBA','SAVINGS','CAA','CURRENT','LAA','LOANS','TUA','DEPOSIT','TDA','DEPOSIT') ACCT_TYPE,
  decode(schm_type,'SBA',(select acct_status from tbaadm.smt where acid=g.acid),'CAA',(select acct_status from tbaadm.smt where acid=g.acid),'ODA',(select acct_status from tbaadm.cam where acid=g.acid),'A') acct_status,
  decode(FREZ_CODE,'T','TOTAL FREEZE','C','CREDIT FREEZE','D','DEBIT FREEZE') FREZE_TYPE, 
  (select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=FREZ_REASON_CODE) FREZ_REASON_CODE1, FREEZE_RMKS,
  (select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=FREZ_REASON_CODE_2) FREZ_REASON_CODE_2, FREEZE_RMKS2,
  (select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=FREZ_REASON_CODE_3) FREZ_REASON_CODE_3, FREEZE_RMKS3,
  (select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=FREZ_REASON_CODE_4) FREZ_REASON_CODE_4, FREEZE_RMKS4,
  (select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=FREZ_REASON_CODE_5) FREZ_REASON_CODE_5, FREEZE_RMKS5,
  LAST_FREZ_DATE,LAST_UNFREZ_DATE,BAL_ON_FREZ_DATE
  from tbaadm.gam g, tbaadm.gac a
  where a.acid=g.acid 
  and foracid='${accountNumber}'
   
  `;
}; //
