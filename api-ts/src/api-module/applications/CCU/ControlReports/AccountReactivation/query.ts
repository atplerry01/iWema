export const getAccReactivationQuery = (startDate: any, endDate: any) => {
    // tslint:disable-next-line: max-line-length
    return `select sol_desc BRANCH_NAME, A.cif_id CUST_NO, purgeremarks, A.FORACID ACCOUNT_NO,a.acct_name ACCOUNT_TITLE,a.acct_opn_date DATE_OPENED,b.acct_status,b.acct_status_date, a.clr_bal_amt CLEARED_BALANCE, Last_Tran_Date, d.Audit_Date REACTIVATION_DATE from tbaadm.gam a,tbaadm.sol,tbaadm.adt d,crmuser.Accounts f, (select acid,acct_status,acct_status_date from tbaadm.cam union select acid,acct_status,acct_status_date from tbaadm.smt) b  where a.acid=d.acid and a.sol_id=sol.sol_id and a.acid = b.acid  and d.modified_fields_data like 'acct_status|D|A|%'  and d.Audit_Date between '${startDate}' and '${endDate}' and f.orgkey = a.cif_id  order by sol_desc`;
};

// getAccReactivationByBranchQuery
export const getAccReactivationByBranchQuery = (branchCode: any, startDate: any, endDate: any) => {
    // tslint:disable-next-line: max-line-length
    return `select sol_desc BRANCH_NAME, A.cif_id CUST_NO, purgeremarks, A.FORACID ACCOUNT_NO,a.acct_name ACCOUNT_TITLE,to_char(a.acct_opn_date,'YYYY-MON-DD') DATE_OPENED,b.acct_status,TO_CHAR(b.acct_status_date, 'YYYY-MON-DD') acct_status_date, a.clr_bal_amt CLEARED_BALANCE,TO_CHAR(Last_Tran_Date, 'YYYY-MON-DD') Last_Tran_Date, TO_CHAR(d.Audit_Date, 'YYYY-MON-DD') REACTIVATION_DATE from tbaadm.gam a,tbaadm.sol,tbaadm.adt d,crmuser.Accounts f, (select acid,acct_status,acct_status_date from tbaadm.cam union select acid,acct_status,acct_status_date from tbaadm.smt) b  where a.acid=d.acid and a.sol_id=sol.sol_id and a.acid = b.acid  and d.modified_fields_data like 'acct_status|D|A|%'  and d.Audit_Date between '${startDate}' and '${endDate}' AND a.sol_id = '${branchCode}' and f.orgkey = a.cif_id  order by sol_desc`;

     
};