
export const getExpenseAlertQuery = (_serviceType, _startDate, _endDate) => {
    // tslint:disable-next-line: max-line-length
    return `select tran_date "TranDate",foracid "AccountNo",acct_name"AccountName",substr(g.gl_sub_head_code,1,2) "GLCode",g.gl_sub_head_code "GLSubHeadCode",tran_amt"TranAmt",value_date"ValueDate",
    tran_particular"Narration",dth_init_sol_id"InitiatingBr",(select sol_desc from tbaadm.sol where sol_id=dth_init_sol_id)"InitiatingBrDesc",
    entry_user_id"EntryUserID",
    decode((select emp_name from tbaadm.get where emp_id=entry_user_id),null,entry_user_id,(select emp_name from tbaadm.get where emp_id=entry_user_id))"EntryUserDesc"
    ,pstd_user_id "AuthorizerID",
    decode((select emp_name from tbaadm.get where emp_id=pstd_user_id),null,pstd_user_id,(select emp_name from tbaadm.get where emp_id=pstd_user_id))"AuthorizerDesc"
    from tbaadm.gam g,tbaadm.dtd h
    where g.acid=h.acid
    and tran_amt >= 25000
    and part_tran_type = 'D'
    and g.gl_sub_head_code in 
    ('75100','75150','75160','75260','75270','75280','75290','75300','75310','75320','75330','75340','75350','75360','75380','75390','75400','75410',
    '75420','75430','75440','75450','75460','75470','75480','75490','75510','75520','75530','75550','75560','75570','75580','75590','75600','75610',
    '75625','75630','75632','75640','75650','75655','75660','75670','75680','75690','75700','75710','75720','75730','75740','75750','75760','75770',
    '75780','75790','75800','75810','75820','75830','75840','75850','75855','75860','75870','75880','75890','75910','75920','75930','75931','75932',
    '75933','75937','75938','75940','75960') and pstd_flg='Y' and h.del_flg='N' `;
};
