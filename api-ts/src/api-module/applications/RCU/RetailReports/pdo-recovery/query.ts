export const getPDOInFlowQuery = (accountNos: string[], startDate, endDate) => {
    return `Select a.foracid,Acct_Name,cif_id,sol_id,(Select Sum(Tran_Amt) From Tbaadm.Htd Where Tran_Date
    Between '${startDate}' and '${endDate}' And Pstd_Flg='Y' And Del_Flg='N' and part_tran_type='C'
    And Acid=a.acid) Tran_Amt From Tbaadm.Gam A where a.ForAcid in (${accountNos.map(acc => `'${acc}'`).join(',')})`;
};
