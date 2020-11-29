import { getCurrentDate, getCurrentMonthStartDate, getPastDate } from '../../../../util/utility';


export const getAccIntroducers_QUERY = (staffId, dateFrom, dateTo, accNumber) => {
    const firstDayOfMonth = getCurrentMonthStartDate();
    const currentDate = getCurrentDate();
    const yesterdayDate = getPastDate(1);

    let q = `select FORACID ACCOUNTNO,ACCT_NAME ACCOUNTNAME,SCHM_DESC ACCOUNTTYPE, 
(CLR_BAL_AMT * CUSTOM.AmountToFC('NOR','${currentDate}',gam.acct_crncy_code,'NGN')) BALANCE,
(custom.getAvgBal_cr(gam.acid,'${firstDayOfMonth}','${yesterdayDate}') * 
CUSTOM.AmountToFC('NOR','${yesterdayDate}',gam.acct_crncy_code,'NGN')) AVERAGE_CREDIT,
(custom.getAvgBal_dr(gam.acid,'${firstDayOfMonth}','${yesterdayDate}') * 
CUSTOM.AmountToFC('NOR','${yesterdayDate}',gam.acct_crncy_code,'NGN')) AVERAGE_DEBIT,
SOL_DESC BRANCH, ACCT_OPN_DATE OPENDATE, ACCT_CRNCY_CODE CURRENCY, 
ACCT_MGR_USER_ID ACCOUNTMGR,FREE_CODE_4 STAFFID
from tbaadm.gam,tbaadm.gac,tbaadm.gsp,tbaadm.sol
where gam.acid=gac.acid
and gam.sol_id=sol.sol_id
and gam.schm_code=gsp.schm_code
and acct_ownership <> 'O' 
and Gam.Del_Flg = 'N' 
`;


    if (accNumber && accNumber.length === 10) {
        q = `${q} and FORACID='${accNumber}'`;
    } else {
        q = `${q} and free_code_4='${staffId}'`;
    }

    if (dateFrom && dateTo && dateFrom !== 'undefined' && dateTo !== 'undefined') {
        q = `${q} and ACCT_OPN_DATE BETWEEN '${dateFrom}' AND '${dateTo}'`;
    }

    console.log('query...................:', q);
    return q;
};
