export const getAccountOpeningBalance_QUERY = (accno, datefrom) => {
    return `SELECT  nvl(tran_date_bal,0)   OPENNINGBAL from tbaadm.eab where 
        acid=(select acid from tbaadm.gam where foracid='${accno}')  and 
          eod_date <=(select to_date( '${datefrom}' ) -1 from dual) and  
          end_eod_date >=(select to_date('${datefrom}') -1 from dual)`;
};
