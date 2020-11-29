import { getCurrentDate, getCurrentMonthStartDate } from "../../../../util/utility";


export const getTotalAccounts5KAvgByStaffIdDetail_QUERY = (staffId: string) => {

    const dt = new Date();
    const currentDate = getCurrentDate();
    const currentMonthStartDate = getCurrentMonthStartDate();

    return `select foracid ACCT_NUMBER, ACCT_NAME, ACCT_OPN_DATE, schm_desc PRODUCT_NAME, sol_desc BRANCH,  
    (custom.getAvgBal_cr(gam.acid,'${currentMonthStartDate}','${currentDate}') * CUSTOM.AmountToFC('NOR','${currentDate}',gam.acct_crncy_code,'NGN')) TOTAL                                 
    from tbaadm.gam, tbaadm.gac, tbaadm.gsp, tbaadm.sol                                       
    where gam.acid = gac.acid              
    and gam.sol_id = sol.sol_id
    and gam.schm_code = gsp.schm_code    
    and acct_ownership <>'O'    
    and acct_opn_date >= '01-jan-${dt.getFullYear()}'
    and (custom.getAvgBal_cr(gam.acid,'${currentMonthStartDate}','${currentDate}') * CUSTOM.AmountToFC('NOR','${currentDate}',gam.acct_crncy_code,'NGN')) >= '5000'                       
    and gam.del_flg='N'      
    and acct_CLS_FLG='N'                                                                    
    and gam.schm_type in ('SBA', 'ODA', 'CAA','TUA') 
    and schm_desc not like 'CREDIT%'
    and schm_desc not like 'CALL%'
    and schm_desc not like '%NEGOTIATION%'                                             
    and FREE_CODE_4 = '${staffId}'`;
};
