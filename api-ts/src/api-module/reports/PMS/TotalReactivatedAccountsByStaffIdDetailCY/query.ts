import { getCurrentMonthStartDate, getCurrentDate } from "../../../../util/utility";


export const getTotalReactivatedAccountsByStaffIdDetail_QUERY = (staffId: string, period: string) => {

    const dt = new Date();
    const currentMonthStartDate = getCurrentMonthStartDate();

    const dateFrom = period === 'm' ? currentMonthStartDate : `01-jan-${dt.getFullYear()}`;
    const dateTo = getCurrentDate();

    return `select foracid ACCT_NO, acct_name,clr_bal_amt BALANCE,acct_opn_date, acct_status, schm_desc PRODUCT_NAME, sol_desc BRANCH, acct_mgr_user_id, acct_crncy_code,  acct_status_date,     
        cust_dob DATE_OF_BIRTH, salutation, gender, phone, preferredphone, email, address_line1, address_line2, address_line3, state, country     
        from tbaadm.gam g, tbaadm.smt t, tbaadm.gsp p, tbaadm.sol s, crmuser.accounts f,  tbaadm.adt r    
        where g.acid = t.acid     
        and r.acid = g.acid 
        and g.schm_code = p.schm_code     
        and g.sol_id=s.sol_id     
        and g.cif_id = f.orgkey  
        and acct_ownership <> 'O'    
        and FREE_CODE_4 = '${staffId}'    
        and (Modified_Fields_Data Like 'acct_status|D|A%'  or Modified_Fields_Data Like 'acct_status|I|A%')     
        and audit_date between '${dateFrom}'  and '${dateTo}'
        and acct_cls_flg = 'N'     
    union all     
        select foracid ACCT_NO, acct_name,clr_bal_amt CURRENT_BAL,acct_opn_date, acct_status, schm_desc PRODUCT_NAME, sol_desc BRANCH, acct_mgr_user_id, acct_crncy_code,  acct_status_date,     
        cust_dob DATE_OF_BIRTH, salutation, gender, phone, preferredphone, email, address_line1, address_line2, address_line3, state, country     
        from tbaadm.gam g, tbaadm.cam c, tbaadm.gsp p, tbaadm.sol s, crmuser.accounts f ,tbaadm.adt r     
        where g.acid = c.acid    
        and r.acid = g.acid 
        and g.schm_code = p.schm_code     
        and g.sol_id=s.sol_id     
        and g.cif_id = f.orgkey  
        and acct_ownership <> 'O'    
        and FREE_CODE_4 ='${staffId}' 
        and (Modified_Fields_Data Like 'acct_status|D|A%'  or Modified_Fields_Data Like 'acct_status|I|A%')    
        and audit_date between '${dateFrom}'  and '${dateTo}'      
        and acct_cls_flg = 'N'`;
};
