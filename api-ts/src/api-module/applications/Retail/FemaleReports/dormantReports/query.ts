export const getDormantFemaleAccountsQuery = (startDate, endDate) => {
  // tslint:disable-next-line: max-line-length
  return `select acct_name,foracid,acct_opn_date, b.cust_sex,acct_status from tbaadm.gam a, crmuser.cmg b, 
  (select acid,acct_status,acct_status_date from tbaadm.cam union select acid,acct_status,acct_status_date from tbaadm.smt) c 
  where a.cif_id=b.cif_id and a.acid=c.acid and cust_sex='F' and sol_id <> '900' and schm_type in ('SBA','CAA','ODA') 
  and acct_cls_flg='N' and a.del_flg='N' AND acct_opn_date BETWEEN '${startDate}' AND '${endDate}'`;
};
