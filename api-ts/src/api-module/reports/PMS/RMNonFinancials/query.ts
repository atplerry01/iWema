import { getCurrentDate, getCurrentMonthStartDate } from "../../../../util/utility";


// oracle  // staffId = 'S08166' +. --ACCT STATUS....D=DORMANT, A=ACTIVE, I=INACTIVE => relationship manager
export const getTotalAccountStatusByStaffId_QUERY = (staffId: string, status: string) => {

    const currentDate = getCurrentDate();

    return `SELECT SUM(ACCT_STATUS) ACCT_STATUS FROM (
            select Count (acct_name) ACCT_STATUS          
            from tbaadm.gam,tbaadm.gac,tbaadm.gsp,tbaadm.sol,tbaadm.sbca_mast_table           
            where gam.acid=gac.acid           
            and gam.sol_id=sol.sol_id           
            and gam.acid=sbca_mast_table.acid           
            and gam.schm_code=gsp.schm_code           
            and acct_ownership <>'O'            
            and acct_CLS_FLG='N' and gam.del_flg='N'                   
            and acct_status in ('${status}')           
            and acct_status_date <= '${currentDate}'       
            and acct_mgr_user_id = '${staffId}'     
        Union all           
            select Count (acct_name) ACCT_STATUS            
            from tbaadm.gam,tbaadm.gac,tbaadm.gsp,tbaadm.sol,tbaadm.cam            
            where gam.acid=gac.acid           
            and gam.sol_id=sol.sol_id           
            and gam.acid=cam.acid           
            and gam.schm_code=gsp.schm_code           
            and acct_ownership <>'O'            
            and acct_CLS_FLG='N' and gam.del_flg='N'                  
            and acct_status in ('${status}')       
            and acct_status_date <= '${currentDate}'     
            and acct_mgr_user_id = '${staffId}'    
        ) `;
};

export const getTotalAccountStatusByStaffIdDetail_QUERY = (staffId: string, status: string) => {

    const currentDate = getCurrentDate();

    return `SELECT foracid ACCT_NUMBER, acct_name, clr_bal_amt BALANCE, schm_desc PRODUCT_NAME, 
    sol_desc BRANCH, ACCT_STATUS, ACCT_STATUS_DATE
    from tbaadm.gam,tbaadm.gac,tbaadm.gsp,tbaadm.sol,tbaadm.sbca_mast_table           
    where gam.acid=gac.acid           
    and gam.sol_id=sol.sol_id           
    and gam.acid=sbca_mast_table.acid           
    and gam.schm_code=gsp.schm_code           
    and acct_ownership <>'O'            
    and acct_CLS_FLG='N' and gam.del_flg='N'           
    and acct_status in ('${status}')         
    and acct_status_date <= '${currentDate}'       
    and acct_mgr_user_id = '${staffId}'     
    Union all           
    SELECT foracid ACCT_NUMBER, acct_name, clr_bal_amt BALANCE, schm_desc PRODUCT_NAME, sol_desc BRANCH, ACCT_STATUS, ACCT_STATUS_DATE       
    from tbaadm.gam,tbaadm.gac,tbaadm.gsp,tbaadm.sol,tbaadm.cam            
    where gam.acid=gac.acid           
    and gam.sol_id=sol.sol_id           
    and gam.acid=cam.acid           
    and gam.schm_code=gsp.schm_code           
    and acct_ownership <>'O'            
    and acct_CLS_FLG='N' and gam.del_flg='N'           
    and acct_status in ('${status}')       
    and acct_status_date <= '${currentDate}'     
    and acct_mgr_user_id = '${staffId}'`;
};

// oracle  // staffId = '08166' => relationship manager
export const getTotalAccounts5KAvgByStaffId_QUERY = (staffId: string) => {

    const dt = new Date();
    const currentDate = getCurrentDate();
    const currentMonthStartDate = getCurrentMonthStartDate();

    return `select count(acct_name) TOTAL_ACCTS_5K_AVG                                      
    from tbaadm.gam, tbaadm.gac, tbaadm.gsp                                        
    where gam.acid = gac.acid              
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


// oracle  // staffId = 'S08166' => relationship manager
export const getUnfundedAccountsByStaffId_QUERY = (staffId: string) => {
    return `select count(acct_name) UNFUNDED_ACCTS                                     
    from tbaadm.gam, tbaadm.gsp                                        
    where acct_ownership <>'O' 
    and gam.schm_code = gsp.schm_code
    and gam.del_flg='N'  
    and acct_CLS_FLG='N'
    and gam.schm_type in ('SBA', 'ODA', 'CAA','TUA')  
    and schm_desc not like 'CALL%'
    and schm_desc not like '%NEGOTIATION%'
    and schm_desc not like 'CREDIT%'
    AND (CLR_BAL_AMT * CUSTOM.AmountToFC('NOR','${getCurrentDate()}',gam.acct_crncy_code,'NGN')) < '500'
    and acct_mgr_user_id = '${staffId}'`;
};


// oracle  // staffId = '08166' => period (m=Month, y=Year) => relationship manager
export const getTotalReactivatedAccountsByStaffId_QUERY = (staffId: string, period: string) => {

    const dt = new Date();
    const currentMonthStartDate = getCurrentMonthStartDate();

    const dateFrom = period === 'm' ? currentMonthStartDate : `01-jan-${dt.getFullYear()}`;
    const dateTo = getCurrentDate();

    return `
    SELECT SUM(REACTIVATED_ACCOUNTS) REACTIVATED_ACCTS 
    FROM (select count(foracid)  REACTIVATED_ACCOUNTS
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
    select count(foracid)  REACTIVATED_ACCTS 
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
    and acct_cls_flg = 'N')`;
};
