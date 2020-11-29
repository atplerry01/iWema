export const getCustomerAccountsTransStat_QUERY = (accno, cDate, cMonthStartDate, cMonthEndDate, 
    cYearStartDate, cYearEndDate) => {
    return `select a.foracid,
            CUSTOM.TURNOVER_AMT('${cDate}','${cDate}',A.ACID,'D' )totaldebittoday,
            CUSTOM.TURNOVER_AMT('${cDate}','${cDate}',A.ACID,'C' )totalcreditttoday,
            CUSTOM.TURNOVER_AMT('${cMonthStartDate}','${cMonthEndDate}',A.ACID,'D' )totaldebitMTD,
            CUSTOM.TURNOVER_AMT('${cMonthStartDate}','${cMonthEndDate}',A.ACID,'C' )totalcreditMTD,
            CUSTOM.TURNOVER_AMT('${cYearStartDate}','${cYearEndDate}',A.ACID,'D' )totaldebitYTD,
            CUSTOM.TURNOVER_AMT('${cYearStartDate}','${cYearEndDate}',A.ACID,'C' )totalcreditYTD
            from tbaadm.gam a,tbaadm.sol c
            where a.sol_id = c.sol_id and c.del_flg = 'N'
            and a.schm_type in ('SBA','ODA') and a.sol_id <> '900' and a.foracid='${accno}'`;

};
