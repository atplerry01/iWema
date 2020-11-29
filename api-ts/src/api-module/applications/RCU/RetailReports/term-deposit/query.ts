
export const getTermDepositQuery = () => {
    // tslint:disable-next-line: max-line-length
    return `select foracid Account, acct_name Name, schm_desc product, sol_desc branch, acct_opn_date AccountOpened, maturity_Date, interest_Rate, clr_bal_amt Balance,acct_crncy_code Currency, acct_mgr_user_id RM, free_code_4 from tbaadm.gam g, tbaadm.sol s, tbaadm.gsp p, tbaadm.tam t, tbaadm.eit e, tbaadm.gac c where g.schm_type='TDA' and g.sol_id=s.sol_id and p.schm_code=g.schm_code and g.acid=t.acid and g.acid=entity_id and g.acid=c.acid and entity_type='ACCNT' order by 1`;
};

export const getTermDepositByDateAndBranchQuery = (branchCode, startDate, endDate) => {
    // tslint:disable-next-line: max-line-length
    return `select foracid Account, acct_name Name, schm_desc product, sol_desc branch, acct_opn_date AccountOpened, maturity_Date, interest_Rate, clr_bal_amt Balance,acct_crncy_code Currency, acct_mgr_user_id RM, free_code_4 from tbaadm.gam g, tbaadm.sol s, tbaadm.gsp p, tbaadm.tam t, tbaadm.eit e, tbaadm.gac c where g.schm_type='TDA' and acct_opn_date between '${startDate}' and '${endDate}' and g.sol_id=s.sol_id and g.sol_id = '${branchCode}' and p.schm_code=g.schm_code and g.acid=t.acid and g.acid=entity_id and g.acid=c.acid and entity_type='ACCNT' order by 1`;
};

export const getTermDepositByDateOnlyQuery = (startDate, endDate) => {
    // tslint:disable-next-line: max-line-length
    return `select foracid Account, acct_name Name, schm_desc product, sol_desc branch, acct_opn_date AccountOpened, maturity_Date, interest_Rate, clr_bal_amt Balance,acct_crncy_code Currency, acct_mgr_user_id RM, free_code_4 from tbaadm.gam g, tbaadm.sol s, tbaadm.gsp p, tbaadm.tam t, tbaadm.eit e, tbaadm.gac c where g.schm_type='TDA' and acct_opn_date between '${startDate}' and '${endDate}' and g.sol_id=s.sol_id and p.schm_code=g.schm_code and g.acid=t.acid and g.acid=entity_id and g.acid=c.acid and entity_type='ACCNT' order by 1`;
};

export const getTermDepositByBranchOnlyQuery = (branchCode) => {
    // tslint:disable-next-line: max-line-length
    return `select foracid Account, acct_name Name, schm_desc product, sol_desc branch, acct_opn_date AccountOpened, maturity_Date, interest_Rate, clr_bal_amt Balance,acct_crncy_code Currency, acct_mgr_user_id RM, free_code_4 from tbaadm.gam g, tbaadm.sol s, tbaadm.gsp p, tbaadm.tam t, tbaadm.eit e, tbaadm.gac c where g.schm_type='TDA' and g.sol_id=s.sol_id and g.sol_id = '${branchCode}' and p.schm_code=g.schm_code and g.acid=t.acid and g.acid=entity_id and g.acid=c.acid and entity_type='ACCNT' order by 1`;
};
