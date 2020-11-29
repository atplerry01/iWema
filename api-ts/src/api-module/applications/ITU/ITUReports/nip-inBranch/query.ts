export const NIPInbranchQuery = (startDate, endDate) => {
  // tslint:disable-next-line: max-line-length
  return `select * from [dbo].[tblTransactionStatus_Outward_full_bkup]
  where DatePosted between '${startDate}' and '${endDate}'
  and ResponseCode ='00'
   `;
};
