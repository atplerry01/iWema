
// oracle
export const getCustomerAccounts_QUERY = (accno) => {
    // scopeLevel contains object of branchCode, RegionCode and ZoneCode
    // level contains either G, R, Z or B
    return `select 
            a.foracid accountnumber,
            a.acct_name accountname,
            a.sol_id branchCode,
            a.ACCT_CRNCY_CODE AS CURRENCY,
            C.SOL_DESC branch,
            a.cif_id customerid,
            (SELECT schm_desc FROM tbaadm.gsp where gsp.schm_code = a.schm_code) accounttypedesc,       
            (Select Email From Crmuser.Phoneemail Where Orgkey = A.Cif_Id And Phoneoremail='EMAIL' 
            And Preferredflag='Y'  and rownum=1) email
            from tbaadm.gam a,tbaadm.sol c
            where a.sol_id = c.sol_id and c.del_flg = 'N'
            and a.schm_type in ('SBA','ODA','CAA') and a.sol_id <> '900' and cif_id=(select cif_id customerid 
                from tbaadm.gam where  foracid='${accno}')`;

};
