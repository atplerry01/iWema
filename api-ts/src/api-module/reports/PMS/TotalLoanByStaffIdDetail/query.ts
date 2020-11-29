import { getCurrentDate } from "../../../../util/utility";

export const getTotalLoanByStaffIdDetail_QUERY = (staffId) => {
    return `select foracid ACCT_NUMBER, ACCT_NAME, ACCT_OPN_DATE, schm_desc PRODUCT_NAME, sol_desc BRANCH, 
    (clr_bal_amt * CUSTOM.AmountToFC('NOR','${getCurrentDate()}',gam.acct_crncy_code,'NGN')) TOTAL
    from tbaadm.gam,tbaadm.gac,tbaadm.gsp,tbaadm.sol
    where gam.acid=gac.acid
    and gam.sol_id=sol.sol_id
    and gam.schm_code=gsp.schm_code
    and acct_ownership <>'O' 
    and gam.del_flg='N'
    and gam.schm_type in ('LAA','ODA')
    and schm_desc not like '%NEGOTIA%'
    and clr_bal_amt < 0      
    and acct_mgr_user_id = '${staffId}'`;
};
