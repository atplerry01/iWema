
// searchAll
export const getSearchAllQuery = (startDate, endDate, searchText, searchText2) => {
  if (searchText === '') {
    return `SELECT [DrAccountNo] ,[CIF]  ,[TotalAmount] ,[CreditSwitchResponseDesc] CreditSwitchResponse  ,
    [FinacleResponse]  ,[ReversalResponse]  ,[ReversalStatus] ,[Naration]  ,[UniqueIdentifier] ,
    [NetworkType] ,[MobileNumber] ,[TransactionDate] ,[EntryDate] ,[ResponseCode]  ,[Status]  ,[RefernceNumber], Vendor  
    FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
    Where [EntryDate] >= '${startDate} 00:00:00.999' AND [EntryDate] <= '${endDate} 23:59:59.999' 
    AND Vendor LIKE '%${searchText2}%'`;
  } else if (searchText2 === '') {
    return `SELECT [DrAccountNo] ,[CIF]  ,[TotalAmount] ,[CreditSwitchResponseDesc] CreditSwitchResponse  ,
    [FinacleResponse]  ,[ReversalResponse]  ,[ReversalStatus] ,[Naration]  ,[UniqueIdentifier] ,
    [NetworkType] ,[MobileNumber] ,[TransactionDate] ,[EntryDate] ,[ResponseCode]  ,[Status]  ,[RefernceNumber], Vendor  
    FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
    Where [EntryDate] >= '${startDate} 00:00:00.999' AND [EntryDate] <= '${endDate} 23:59:59.999' 
    AND [DrAccountNo] LIKE '%${searchText}%'`;
  } else {
    return `SELECT [DrAccountNo] ,[CIF]  ,[TotalAmount] ,[CreditSwitchResponseDesc] CreditSwitchResponse  ,
    [FinacleResponse]  ,[ReversalResponse]  ,[ReversalStatus] ,[Naration]  ,[UniqueIdentifier] ,
    [NetworkType] ,[MobileNumber] ,[TransactionDate] ,[EntryDate] ,[ResponseCode]  ,[Status]  ,[RefernceNumber], Vendor  
    FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
    Where [EntryDate] >= '${startDate} 00:00:00.999' AND [EntryDate] <= '${endDate} 23:59:59.999' 
    AND [DrAccountNo] LIKE '%${searchText}%' AND Vendor LIKE '%${searchText2}%'`;
  }
};

// reportOnly
// Success
export const getReportSuccessQuery = () => {
  return `SELECT [DrAccountNo] ,[CIF]  ,[TotalAmount] ,[CreditSwitchResponseDesc] CreditSwitchResponse  ,
  [FinacleResponse]  ,[ReversalResponse]  ,[ReversalStatus] ,[Naration]  ,[UniqueIdentifier] ,
  [NetworkType] ,[MobileNumber] ,[TransactionDate] ,[EntryDate] ,[ResponseCode]  ,[Status]  ,[RefernceNumber], Vendor  
  FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
  Where [ResponseCode]='00'`;
};

// Failed
export const getReportFailedQuery = () => {
  return `SELECT [DrAccountNo] ,[CIF]  ,[TotalAmount] ,[CreditSwitchResponseDesc] CreditSwitchResponse  ,
  [FinacleResponse]  ,[ReversalResponse]  ,[ReversalStatus] ,[Naration]  ,[UniqueIdentifier] ,
  [NetworkType] ,[MobileNumber] ,[TransactionDate] ,[EntryDate] ,[ResponseCode]  ,[Status]  ,[RefernceNumber], Vendor  
  FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
  Where [ResponseCode] like '%06|06|Failed%'`;
};

// Reversed
export const getReportReverseQuery = () => {
  return `SELECT TOP 10 [DrAccountNo] ,[CIF]  ,[TotalAmount] ,[CreditSwitchResponseDesc] CreditSwitchResponse  ,
  [FinacleResponse]  ,[ReversalResponse]  ,[ReversalStatus] ,[Naration]  ,[UniqueIdentifier] ,
  [NetworkType] ,[MobileNumber] ,[TransactionDate] ,[EntryDate] ,[ResponseCode]  ,[Status]  ,[RefernceNumber], Vendor  
  FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
  Where [ResponseCode] like '03|Approved%'`;
};

// reportAndTextOnly
// Success
export const getReportTextSuccessQuery = (searchText, searchText2) => {
  if (searchText === '') {
    return `SELECT *
      FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
      Where [ResponseCode]='00'
      AND Vendor LIKE '%${searchText2}%'`;
  } else if (searchText2 === '') {
    return `SELECT *
      FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
      Where [ResponseCode]='00'
      AND DrAccountNo Like '%${searchText}%'`;
  } else {
    return `SELECT *
      FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
      Where [ResponseCode]='00'
      AND Vendor LIKE '%${searchText2}%' AND DrAccountNo Like '%${searchText}%'`;
  }

};

// Failed
export const getReportTextFailedQuery = (searchText, searchText2) => {
  return `SELECT *
  FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
  Where [ResponseCode] like '%06|06|Failed%'
  AND Vendor LIKE '%${searchText2}%' AND DrAccountNo Like '%${searchText}%'`;
};

// Reversed
export const getReportTextReverseQuery = (searchText, searchText2) => {
  return `SELECT *
  FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
  Where [ResponseCode] like '03|Approved%'
  AND Vendor LIKE '%${searchText2}%' AND DrAccountNo Like '%${searchText}%'`;
};


// reportAndDateOnly
// Success
export const getReportDateSuccessQuery = (startDate, endDate) => {
  return `SELECT *
  FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
  Where [ResponseCode]='00'
  AND [EntryDate] >= '${startDate} 00:00:00.999' AND [EntryDate] <= '${endDate} 23:59:59.999'`;
};

// Failed
export const getReportDateFailedQuery = (startDate, endDate) => {
  return `SELECT *
  FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
  Where [ResponseCode] like '%06|06|Failed%'
  AND [EntryDate] >= '${startDate} 00:00:00.999' AND [EntryDate] <= '${endDate} 23:59:59.999'`;
};

// Reversed
export const getReportDateReverseQuery = (startDate, endDate) => {
  return `SELECT *
  FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
  Where [ResponseCode] like '03|Approved%'
  AND [EntryDate] >= '${startDate} 00:00:00.999' AND [EntryDate] <= '${endDate} 23:59:59.999'`;
};

// dateRangeOnly
export const getDateRangeQuery = (startDate, endDate) => {
  return `SELECT *
  FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
  Where [EntryDate] >= '${startDate} 00:00:00.999' AND [EntryDate] <= '${endDate} 23:59:59.999'`;
};

// searchTextOnly
export const getSearchTextQuery = (searchText, searchText2) => {
  if (searchText === '') {
    return `SELECT TOP 1000 *
    FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
    Where Vendor LIKE '%${searchText2}%'`;
  } else if (searchText2 === '') {
    return `SELECT TOP 1000 *
    FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
    Where DrAccountNo Like '%${searchText}%'`;
  } else {
    return `SELECT TOP 1000 *
    FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]
    Where Vendor LIKE '%${searchText2}%' AND DrAccountNo Like '%${searchText}%'`;
  }
};











export const getReportSuccessfulQuery = () => {
  return `SELECT [DrAccountNo] ,[CIF]  ,[TotalAmount] ,[CreditSwitchResponseDesc] CreditSwitchResponse  ,
  [FinacleResponse]  ,[ReversalResponse]  ,[ReversalStatus] ,[Naration]  ,[UniqueIdentifier] ,
  [NetworkType] ,[MobileNumber] ,[TransactionDate] ,[EntryDate] ,[ResponseCode]  ,[Status]  ,[RefernceNumber], Vendor  
  FROM [MobileBankingDB].[dbo].[CreditSwitchAirtimeLog]`;
};

