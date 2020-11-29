// MandateByBranchWith
// MandateByProduct

export const getMandateByBranchOnlyQuery = (branchCode: any, startDate: any, endDate: any) => {
    // tslint:disable-next-line: max-line-length
    return `select foracid,acct_name,gam.sol_id,sol_desc,gam.schm_type,gam.schm_code,'NO' mandate,acct_opn_date, gam.clr_bal_amt, gam.Acct_ownership,gam.Acct_mgr_user_id, tbaadm.gac.free_code_4, case gam.schm_type when 'SBA' then 'Savings' when 'CAA' then 'Domiciliary' when 'ODA' then 'Current' end as account_type, gsp.Schm_desc, frez_code,frez_reason_code from tbaadm.gam,tbaadm.sol,tbaadm.gsp, tbaadm.gac where acct_opn_date between '${startDate}' and '${endDate}' and gam.sol_id=sol.sol_id and gam.acid = gac.acid and gam.schm_code = gsp.schm_code and gam.sol_id in (select sol_id from tbaadm.sst where set_id = upper('${branchCode}')) and gam.schm_type in ('ODA','SBA','CAA') and foracid not in ((select o.acctid from SVSUSER.signotherinfo o,SVSUSER.signmaintenance m where gam.foracid=o.acctid and o.signid=m.signid)) and entity_cre_flg='Y' and gam.del_flg='N'`;
};

export const getMandateByProductOnlyQuery = (productCode: any, startDate: any, endDate: any) => {
    // tslint:disable-next-line: max-line-length
    return `select foracid,acct_name,gam.sol_id,sol_desc,gam.schm_type,gam.schm_code,'NO' mandate,acct_opn_date, gam.clr_bal_amt, gam.Acct_ownership,gam.Acct_mgr_user_id, tbaadm.gac.free_code_4, case gam.schm_type when 'SBA' then 'Savings' when 'CAA' then 'Domiciliary' when 'ODA' then 'Current' end as account_type, gsp.Schm_desc, frez_code,frez_reason_code from tbaadm.gam,tbaadm.sol,tbaadm.gsp, tbaadm.gac where acct_opn_date between '${startDate}' and '${endDate}' and gam.sol_id=sol.sol_id and gam.acid = gac.acid and gam.schm_code = gsp.schm_code and gam.schm_code = '${productCode}' and gam.schm_type in ('ODA','SBA','CAA') and foracid not in ((select o.acctid from SVSUSER.signotherinfo o,SVSUSER.signmaintenance m where gam.foracid=o.acctid and o.signid=m.signid)) and entity_cre_flg='Y' and gam.del_flg='N'`;
};
