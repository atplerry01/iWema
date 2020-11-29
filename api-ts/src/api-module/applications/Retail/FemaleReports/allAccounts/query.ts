export const getAllAccountsQuery = (startDate, endDate) => {
  // tslint:disable-next-line: max-line-length
  return `select foracid,acct_name,acct_opn_date,cust_dob,to_char(sysdate,'YYYY') -birth_year Age,(select phoneno from tbaadm.cphone where phone_b2kid=a.cif_id and rownum=1) Phone, (select email from tbaadm.cemail where email_b2kid=a.cif_id and rownum=1) Email, (select Address_Line1||' '||Address_Line2||' '||Address_Line3 from crmuser.address where orgkey=a.cif_id And Addresscategory <>'Swift' and rownum=1) Address ,schm_type,clr_bal_amt from tbaadm.gam a,crmuser.accounts b where a.cif_id=b.orgkey and acct_opn_date between '${startDate}' and '${endDate}' and gender='F' and acct_cls_flg='N'`;
};
