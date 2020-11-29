// MandateByBranchWith
// MandateByProduct

export const getLienAccountQuery = (accountNumber: any, cif: any) => {
  // tslint:disable-next-line: max-line-length
  return `select foracid acct_no, cif_id,acct_name, a.lien_amt, FUTURE_ULIEN_AMT,lien_remarks, b2k_id module_id,
  decode(B2K_TYPE,'ULIEN','USER DEFINED','PCRLN','PARTIAL CHARGE RECOVERY','LOANS','DUE TO LOANS','PROXY','PROXY POSTING','A','ACCOUNT COLLATERAL','ACSWP','DUE TO SWEEPS','OTHERS') Module_Type,
  lien_reason_code,(select ref_desc from tbaadm.rct where ref_rec_type='BF' and ref_code=lien_reason_code) lien_reason_desc, LIEN_START_DATE,LIEN_EXPIRY_DATE,REQUESTED_BY_DESC,REQUEST_DEPARTMENT,USER_ID
  from tbaadm.alt a, tbaadm.gam g
  where a.acid=g.acid 
  and a.entity_cre_flg='Y'
  and a.del_flg='N'
  and (foracid ='${accountNumber}' or cif_id ='${cif}')
  `;
};
