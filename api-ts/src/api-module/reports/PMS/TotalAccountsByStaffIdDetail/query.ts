import * as _ from 'lodash';
import { getCurrentDate, getCurrentMonthStartDate } from '../../../../util/utility';



export const getTotalAccountsByStaffIdDetail_QUERY = (staffId: string, period: string) => { 
    let q = `select foracid ACCT_NUMBER, ACCT_NAME, ACCT_OPN_DATE, schm_desc PRODUCT_NAME, sol_desc BRANCH, 
    (clr_bal_amt * CUSTOM.AmountToFC('NOR','${getCurrentDate()}',gam.acct_crncy_code,'NGN')) TOTAL                                       
    from tbaadm.gam, tbaadm.gac, tbaadm.gsp, tbaadm.sol                                         
    where gam.acid = gac.acid 
    and gam.sol_id = sol.sol_id
    and gam.schm_code = gsp.schm_code                         
    and gam.del_flg='N'   
    and acct_CLS_FLG='N'     
    and acct_ownership <>'O'  
    and gam.schm_type in ('SBA', 'ODA', 'CAA','TUA')   
    and schm_desc not like 'CREDIT%'
    and schm_desc not like 'CALL%' 
    `;

    if (!period) {
        return `${q}  and acct_mgr_user_id = '${staffId}'`; 
    }

    q = `${q}  and FREE_CODE_4 = '${staffId.substring(staffId.length - 5)}'`; 

    const dt = new Date();
    const currentDate = getCurrentDate();
    const currentMonthStartDate = getCurrentMonthStartDate();

    if (period === 'm') { // current month
        q = `${q} and acct_opn_date between '${currentMonthStartDate}'  and '${currentDate}'`;
    } else if (period === 'y') { // current year
        q = `${q} and acct_opn_date between '01-jan-${dt.getFullYear()}'  and '${currentDate}'`;
    }

    return q;
};
