
    // mssql
    export const getWemaCollectReport_QUERY = (Webguid) => {
        let q = `SELECT [webguid],[tellerName],[tillaccountName],[tillaccountDebited], 
        transactionID,  [agencyCode], [revenueCode] ,[state],
        [accountNoCredited] ,[amount] ,[debitNarration],
        [creditNarration] ,[branchName] ,[paymentRef] ,
        [transactionType] 
        ,(SELECT CASE [status]
            WHEN 1 THEN 'SUCCESS'
            WHEN 0 THEN 'FAILED'
            ELSE 'NULL'
            END) AS status
        ,[transCode],
        [transactionDate], [PayerName], SUBSTRING(finacleResponse, 0,12) as finacleResponse              
        FROM [SchVirtualPayment ].[dbo].[RevpayTransactions]  
        where convert(varchar, transactionDate, 110) between  @dateFrom and @dateTo`;


        if (Webguid) {
            q = `${q} and Webguid=@Webguid`;
        }
        return q;
        // date format mm-dd-yyyy
    };
