export const ebillsQuery = (startDate, endDate) => {
  // tslint:disable-next-line: max-line-length
  return `select  * from [dbo].[tblEbillPayLog_full_bkp]
  where datecreated between  '${startDate}' and '${endDate}'
  
   `;
};
