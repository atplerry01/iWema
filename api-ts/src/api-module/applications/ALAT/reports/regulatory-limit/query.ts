
export const getRegulatoryLimitQuery = () => {
    // tslint:disable-next-line: max-line-length
    return `select * from (
select a.foracid,c.schm_desc, a.acct_name, a.frez_code,a.frez_reason_code,a.last_frez_date, a.emp_id,a.last_tran_date,a.acct_opn_date,
(select phoneno from crmuser.phoneemail g where PREFERREDFLAG='Y' and PHONEOREMAIL = 'PHONE' and g.orgkey = a.cif_id)phone,
(select EMAIL from crmuser.phoneemail g where PREFERREDFLAG='Y' and PHONEOREMAIL = 'EMAIL' and g.orgkey = a.cif_id)email ,
b.freeze_rmks,
b.freeze_rmks2,b.freeze_rmks3,b.freeze_rmks4,b.freeze_rmks5,
(select ref_desc from tbaadm.rct  where ref_rec_type='31' and ref_code=a.frez_reason_code)frez_reason_code_1,
(select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=a.FREZ_REASON_CODE_2)FREZ_REASON_CODE_2,
(select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=a.FREZ_REASON_CODE_3)FREZ_REASON_CODE_3,
(select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=a.FREZ_REASON_CODE_4)FREZ_REASON_CODE_4,
(select ref_desc from tbaadm.rct where ref_rec_type='31' and ref_code=a.FREZ_REASON_CODE_5)FREZ_REASON_CODE_5,
a.clr_bal_amt
from tbaadm.gam  a,
tbaadm.gac  b,
tbaadm.gsp c
where a.acid = b.acid
and a.frez_code = 'D'
and a.schm_code=c.schm_code
and c.schm_code in ('60010','60012','60013')
and a.frez_code = 'D'
and (freeze_rmks2 like ('%THRESHOLD%') or freeze_rmks2 like ('%SINGLE INFLOW%') or freeze_rmks2 like ('%LIMIT%') or freeze_rmks2 like ('%REGULATORY%') or freeze_rmks2 like ('%FIRST%') )
order by b.freeze_rmks asc
) sub1 order by 11 asc
      `;
  };
