export const getLoanCollectionsDetailsQuery = (accountNos: string[]) => {
    return `select
    (select cif_id from tbaadm.gam g where g.acid=a.op_acid) cif_id,
    (select acct_cls_flg from tbaadm.gam g where g.acid=a.op_acid) acct_cls_flg,
    (select foracid from tbaadm.gam g where g.acid=a.acid) loan_account_no,
    (select acct_name from tbaadm.gam g where g.acid=a.acid) loan_acct_name,
    (select sol_id from tbaadm.gam g where g.acid=a.op_acid) oper_acct_brn_id,
    (select sol_desc from tbaadm.sol s,tbaadm.gam g where s.sol_id = g.sol_id and g.acid=a.op_acid) oper_acct_brn_name,
    (select foracid from tbaadm.gam g where g.acid=a.op_acid) oper_acct_no,
    (select acct_name from tbaadm.gam g where g.acid=a.op_acid) oper_acct_name,
    (select clr_bal_amt from tbaadm.gam g where g.acid=a.op_acid) oper_acct_bal,
    (select lien_amt from tbaadm.gam g where g.acid=a.op_acid) oper_acct_lien_amt,
    (select schm_code from tbaadm.gam g where g.acid=a.op_acid) schm_code,
    (select clr_bal_amt from tbaadm.gam g where g.acid=a.acid) loan_acct_bal,
    (select dmd_amt from tbaadm.ldt l,tbaadm.gam g where l.acid = g.acid and g.acid=a.op_acid and dmd_flow_id = 'INDEM') interest_due,
    (select dmd_amt from tbaadm.ldt l,tbaadm.gam g where l.acid = g.acid and g.acid=a.op_acid and dmd_flow_id = 'PRDEM') principal_due,
    dis_shdl_date start_date, dis_amt loan_amount from tbaadm.lam a
    where (select foracid from tbaadm.gam g where g.acid=a.acid) in (${accountNos.map(acc => `'${acc}'`).join(',')})`;
};
