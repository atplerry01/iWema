// MandateByBranchWith
// MandateByProduct


export const getAllUssdTransQuery = () => {
  return `SELECT *
  FROM [MobileBankingDB].[dbo].[TransactionLog]
  WHERE TransactionDate >= CONCAT(CONVERT (date, GETDATE()), ' 00:00:00') AND TransactionDate <=  CONCAT (CONVERT (date, GETDATE()), ' 23:59:59')`
};

export const getAllSearchUssdTransQuery = (dateFrom, dateTo, searchText) => {
  return `Select * from [MobileBankingDB].[dbo].[TransactionLog] 
  where PhoneNumber like '%${searchText}%' OR SourceAccountNumber like '%${searchText}%' 
  AND TransactionDate >= CONCAT(${dateFrom}, ' 00:00:00') AND TransactionDate <=  CONCAT (${dateTo}, ' 23:59:59')`;
};

export const getDateRangeUssdTransQuery = (dateFrom, dateTo) => {
  return `Select * from [MobileBankingDB].[dbo].[TransactionLog] 
  where TransactionDate >= '${dateFrom} 00:00:00' AND TransactionDate <=  '${dateTo} 23:59:59'`;
};

export const getTextOnlyUssdTransQuery = (searchText) => {
  return `Select * from [MobileBankingDB].[dbo].[TransactionLog] where SourceAccountNumber like '%${searchText}%'  
  OR PhoneNumber like '%${searchText}%' OR DestinationAccountNumber like '%${searchText}%'`;
};
