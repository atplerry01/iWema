export const getAccountsOpenedQuery = (startDate, endDate) => {
  // tslint:disable-next-line: max-line-length
  return `select count(1),sum(clr_bal_amt) from tbaadm.gam a,crmuser.accounts b where a.cif_id=B.ORGKEY and acct_opn_date between '${startDate}' and '${endDate}' and gender='F' and schm_type in ('ODA','SBA','CAA') `;
};
