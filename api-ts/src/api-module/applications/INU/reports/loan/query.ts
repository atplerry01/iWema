// MandateByBranchWith
// MandateByProduct

export const getLoanQuery = () => {
  // tslint:disable-next-line: max-line-length
  return `select CIF,SourceAccountNumber,DestinationBank,TransactionStatus,Amount,TransactionDate,b.TranType,Narration,ChannelType,Currency,ResponseDescription
  from TransactionLog a, TransactionType b
  where a.TransactionStatus= b.ID
  union all
  select CIF,SourceAccountNumber,DestinationBank,TransactionStatus,Amount,TransactionDate,b.TranType,Narration,ChannelType,Currency,ResponseDescription
  from TransactionLog_bkup_08022020 a, TransactionType b
  where a.TransactionStatus = b.ID
  `;
}; //
