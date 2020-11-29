export const getTotalDepositSum_QUERY = (staffId: string, startDate: string, endDate: string) => {
    
    return `select sum(clr_bal_amt * CUSTOM.AmountToFC('NOR','${startDate}',gam.acct_crncy_code,'NGN')) ACTUAL_BAL,  
    sum (custom.getAvgBal_cr(gam.acid,'${startDate}','${endDate}') * CUSTOM.AmountToFC('NOR','${endDate}',gam.acct_crncy_code,'NGN')) AVERAGE_BAL
 from tbaadm.gam,tbaadm.gac,tbaadm.gsp,tbaadm.sol
 where gam.acid=gac.acid
 and gam.sol_id=sol.sol_id
 and gam.schm_code=gsp.schm_code
 and acct_ownership <>'O' 
 and gam.del_flg='N'
 and gam.schm_type not in ('LAA')
 and schm_desc not like '%NEGOTIA%'
 and acct_mgr_user_id = '${staffId}'
 order by AVERAGE_BAL desc`;
};
