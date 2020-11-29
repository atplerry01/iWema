import { getCurrentDate } from "../../../../util/utility";


export const getUnfundedAccountsByStaffIdDetail_QUERY = (staffId: string) => {
    const currentDate = getCurrentDate();

    return `select foracid ACCT_NUMBER, ACCT_NAME, ACCT_OPN_DATE, 
    (CLR_BAL_AMT * CUSTOM.AmountToFC('NOR','${currentDate}',gam.acct_crncy_code,'NGN')) BALANCE,
    acct_crncy_code CURRENCY_TYPE,phone, preferredphone, email, address_line1, address_line2, 
    address_line3, state, country                                  
    from tbaadm.gam,  crmuser.accounts, tbaadm.gsp                                     
    where gam.cif_id = crmuser.accounts.orgkey
    and gam.schm_code = gsp.schm_code
    and acct_ownership <>'O'                                         
    and gam.del_flg='N'  
    and acct_CLS_FLG='N'
    and gam.schm_type in ('SBA', 'ODA', 'CAA','TUA')  
    and schm_desc not like 'CALL%'
    and schm_desc not like '%NEGOTIATION%'
    and schm_desc not like 'CREDIT%'    
    AND (CLR_BAL_AMT * CUSTOM.AmountToFC('NOR','${currentDate}',gam.acct_crncy_code,'NGN')) < '500'
    and acct_mgr_user_id = '${staffId}'`;
};
