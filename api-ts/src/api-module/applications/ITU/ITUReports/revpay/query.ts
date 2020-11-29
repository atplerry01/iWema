export const revpayQuery = (startDate, endDate) => {
  // tslint:disable-next-line: max-line-length
  return `select  * from [dbo].[RevpayTransactions]
  where finacleResponseDescrip ='SUCCESSFUL'
  and ResponseCode ='SUCCESSFULL'
  and transactionDate between '${startDate}' and '${endDate}'
   `;
};
