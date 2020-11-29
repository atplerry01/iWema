import { getCurrentMonthStartDate, getCurrentDate } from "../../../../util/utility";

// oracle  // staffId = 'S08166' => relationship manager ///Casa
export const getTotalCasa_QUERY = (staffId: string, period: string) => {
    const dt = new Date();
    const currentMonthStartDate = getCurrentMonthStartDate();
    const dateFrom = period === 'm' ? currentMonthStartDate : `01-jan-${dt.getFullYear()}`;
    const dateTo = getCurrentDate();
   
    return `select sum(clr_bal_amt * CUSTOM.AmountToFC('NOR','${dateTo}',gam.acct_crncy_code,'NGN')) 
    ACTUAL_BAL,  sum (custom.getAvgBal_cr(gam.acid,'${dateFrom}','${dateTo}') * CUSTOM.AmountToFC('NOR','${dateTo}',gam.acct_crncy_code,'NGN')) AVERAGE_BAL
    from tbaadm.gam,tbaadm.gac,tbaadm.gsp,tbaadm.sol
    where gam.acid=gac.acid
    and gam.sol_id=sol.sol_id
    and gam.schm_code=gsp.schm_code
    and acct_ownership <>'O' 
    and gam.del_flg='N'
    and acct_CLS_FLG='N'
    and gam.schm_type in ('SBA', 'ODA', 'TUA', 'CAA')
    and schm_desc not like '%CALL%' 
    and schm_desc not like '%NEGOTIA%'
    and acct_mgr_user_id = '${staffId}'
    order by AVERAGE_BAL desc`;
   };
