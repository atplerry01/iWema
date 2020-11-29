
export const getRestrictedAccountQuery = (date: any) => {
    // tslint:disable-next-line: max-line-length
    // return `select foracid,acct_name,acct_opn_date,frez_code,clr_bal_amt,last_frez_date,sol_id,
    // (select sol_desc from tbaadm.sol where sol_id=a.sol_id)sol_desc,acct_status,
    // (select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=frez_reason_code)frez_reason_code
    // ,(select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=FREZ_REASON_CODE_2)FREZ_REASON_CODE_2,
    // (select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=FREZ_REASON_CODE_3)FREZ_REASON_CODE_3,
    // (select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=FREZ_REASON_CODE_4)FREZ_REASON_CODE_4,
    // (select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=FREZ_REASON_CODE_5)FREZ_REASON_CODE_5,
    // b.freeze_rmks,
    // b.freeze_rmks2,b.freeze_rmks3,b.freeze_rmks4,b.freeze_rmks5
    // from tbaadm.gam a, tbaadm.smt c ,tbaadm.gac b
    // where a.acid=c.acid
    // and b.acid=c.acid
    // and a.acid=b.acid
    // and schm_code in ('60010','60012','60013')
    // and ltrim(frez_code) is not null
    // and entity_cre_flg='Y' and a.del_flg='N' and acct_cls_flg='N'`;

    return `select foracid,acct_name,acct_opn_date,frez_code,clr_bal_amt,last_frez_date,sol_id,schm_code,
    (select schm_desc from tbaadm.gsp where schm_code=a.schm_code) schm_desc,
    (select sol_desc from tbaadm.sol where sol_id=a.sol_id)sol_desc,acct_status,
    (select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=frez_reason_code)frez_reason_code
    ,(select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=FREZ_REASON_CODE_2)FREZ_REASON_CODE_2,
    (select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=FREZ_REASON_CODE_3)FREZ_REASON_CODE_3,
    (select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=FREZ_REASON_CODE_4)FREZ_REASON_CODE_4,
    (select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=FREZ_REASON_CODE_5)FREZ_REASON_CODE_5,
    b.freeze_rmks,
    b.freeze_rmks2,b.freeze_rmks3,b.freeze_rmks4,b.freeze_rmks5
    from tbaadm.gam a, tbaadm.smt c ,tbaadm.gac b
    where a.acid=c.acid
    and b.acid=c.acid
    and a.acid=b.acid
    and schm_code in ('60010','60012','60013')
    and last_frez_date > '${date}' 
    and ltrim(frez_code) is not null
    and entity_cre_flg='Y' and a.del_flg='N' and acct_cls_flg='N'`;
  };
