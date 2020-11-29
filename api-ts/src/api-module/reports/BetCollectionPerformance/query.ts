export const get_BetCollectionPerformance_QUERY = (accountNo, startDate, endDate) => {

    return `select count(lpad(TRAN_ID,9,' ')) NO_OF_TRANSACTIONS,sum(decode(PART_TRAN_TYPE,'D',TRAN_AMT*-1)) as DR_VOLUME, sum(decode(PART_TRAN_TYPE,'C',TRAN_AMT)) CR_VOLUME from tbaadm.htd h  
    where acid=(select acid from tbaadm.gam where foracid =  '${accountNo}'  and del_flg='N') and TRAN_DATE between '${startDate}' 
    and '${endDate}'and del_flg='N'and PSTD_FLG='Y' and (TRAN_RMKS!='TACBSH' or TRAN_RMKS is null) `;   
};
