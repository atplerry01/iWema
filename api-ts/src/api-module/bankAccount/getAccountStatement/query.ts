export const getAccountStatement_QUERY = (accno, datefrom, dateto) => {
    return `select RCRE_TIME,LCHG_TIME,VFD_DATE,PSTD_DATE,ENTRY_DATE,TRAN_DATE,value_date,lpad(TRAN_ID,9,' ') TRANID,
        TRAN_PARTICULAR  PARTICULARS,decode(PART_TRAN_TYPE,'D',TRAN_AMT*-1) DR,  decode(PART_TRAN_TYPE,'C',TRAN_AMT) CR, 
        decode(PART_TRAN_TYPE,'D',TRAN_AMT*-1,TRAN_AMT) BALANCE,PART_TRAN_SRL_NUM,INSTRMNT_NUM,gl_date from tbaadm.htd h  
         where acid=(select acid from tbaadm.gam where foracid =  '${accno}'  and del_flg='N') and TRAN_DATE between '${datefrom}' 
         and '${dateto}'
        and del_flg='N'and PSTD_FLG='Y' and (TRAN_RMKS!='TACBSH' or TRAN_RMKS is null) union all 
         select RCRE_TIME,LCHG_TIME,VFD_DATE,PSTD_DATE,ENTRY_DATE,TRAN_DATE,value_date,lpad(TRAN_ID,9,' ') TRANID,
         TRAN_PARTICULAR  PARTICULARS,decode(PART_TRAN_TYPE,'D',TRAN_AMT*-1) DR, 
         decode(PART_TRAN_TYPE,'C',TRAN_AMT) CR, decode(PART_TRAN_TYPE,'D',TRAN_AMT*-1,TRAN_AMT) BALANCE,
         PART_TRAN_SRL_NUM,INSTRMNT_NUM,gl_date from tbaadm.dtd h  
         where acid=(select acid from tbaadm.gam where foracid= '${accno}' and del_flg='N') 
         and TRAN_DATE between '${datefrom}' and '${dateto}' and del_flg='N'and PSTD_FLG='Y' and (TRAN_RMKS!='TACBSH' or TRAN_RMKS is null) 
         ORDER BY gl_date,pstd_date,TRANID,PART_TRAN_SRL_NUM`;
};

export const getAccountStatementDetail_QUERY = (accno) => {
    return `select a.acct_name accountname,a.ACCT_CRNCY_CODE AS CURRENCY,(SELECT schm_desc FROM tbaadm.gsp where gsp.schm_code = a.schm_code) accounttypedesc, (select  substr(nvl(B.Address_Line1,''),1,50) from crmuser.accounts b where orgkey = a.cif_id) address1 from tbaadm.gam a where a.foracid='${accno}'`;
};