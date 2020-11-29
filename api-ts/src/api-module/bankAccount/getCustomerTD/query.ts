export const getCustomerTD_QUERY = (accno) => {
    return `select acct_opn_date "AcctOpnDate",
    acct_cls_date,foracid,system.int_rate_cr(g.foracid) Interest_rate,case g.schm_type when 'CAA' then 'CALL DEPOSIT' when 'TDA' 
    then 'TERM DEPOSIT' when 'ODA' then 'OverDraftAccount' when 'CAA' then 'CurrentAccount' end "AccountDesc",
    deposit_amount principalamount,deposit_period_days tenor, foracid CustomerAccountNo,cif_id,g.acct_crncy_code
    from tbaadm.gam g,tbaadm.csp,tbaadm.sol,tbaadm.dtt,CRMUSER.corporate,tbaadm.tam ,tbaadm.gsp,
    (select sol_id,(select set_desc from tbaadm.stid
                    where set_id = (select set_id from tbaadm.sst 
                                    where sol_id=s.sol_id 
                                    and set_id like 'Z%')) zone from tbaadm.sol s
    where state_code='15' and del_flg='N') z ,
    (select b.orgkey ,A.email,B.phoneno From  (Select Orgkey,Email From Crmuser.Phoneemail  Where 
    Phoneoremail='EMAIL' And Preferredflag='Y') A, (Select Orgkey,Phoneno From Crmuser.Phoneemail  
        Where Phoneoremail='PHONE' And Preferredflag='Y') B 
    Where A.Orgkey(+) =B.Orgkey) D  where g.acid =dtt.acid and g.sol_id=sol.sol_id and g.acid=tam.acid and g.cif_id=corporate.corp_key(+) 
    and sol.sol_id=z.sol_id and g.schm_code=csp.schm_code and g.schm_code=gsp.schm_code and 
    g.acct_crncy_code=csp.crncy_code and g.cif_id=D.Orgkey(+) 
    and g.schm_type='TDA' and tran_date between '01-FEB-2017' and '28-FEB-2017' and g.wtax_pcnt <> 0 and flow_code='IO' and part_tran_type='C' 
    and dtt.del_flg='N' and cif_id=(select cif_id customerid from tbaadm.gam where  foracid='${accno}')`;
};
