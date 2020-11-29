  // mssql
  export const getLimitNotification_QUERY = () => {
    return `SELECT 
    [destAddress] Phone
    ,[messageText] Message  
    ,dlr_timestamp AS SMSDate
    ,dlr_description       
    ,b.sol_id BranchCode
    ,c.Acct_Num AccountNo
    ,c.ACCT_NAME AccountName
    ,a.smscount SMSCount
FROM [MessagePRO].[dbo].[mGateProxy] a
join CustomerInfo b on a.destAddress = b.PHONENO
join [dbo].[AccountInfo] c on b.CORP_KEY =c.CIF_ID  
where messageText like '%A restriction has been placed on your%'
and sent_at between @dateFrom and @dateTo`;
    // date format mm-dd-yyyy
};
