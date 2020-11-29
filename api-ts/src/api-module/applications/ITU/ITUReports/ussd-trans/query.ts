export const getUssdTransQuery = (TransId, startDate, endDate) => {
  // tslint:disable-next-line: max-line-length
  return ` select distinct (a.retrieval_reference_nr),a.tran_nr,system_trace_audit_nr,b.pan pan,a.message_type, b.terminal_id, b.card_acceptor_name_loc,
  CONVERT(VARCHAR, a.datetime_req, 103) AS LOCALTIME,
 case a.rsp_code_rsp
         when '00' then 'Approved'
         when '91' then 'Issuer InOperative'
         when '55' then 'Incorrect Pin'
         when '51' then 'Insufficient Funds'
         when '52' then 'No Savings Account'
         when '53' then 'No Current Account'
         when '57' then 'Transaction Not Permitted to Cardholder'
         when '58' then 'Transaction Not Permitted on Terminal'
         when '56' then 'No card record'
         when '61' then 'Exceed Withdrawal Limit'
         when '06' then 'error'
         when '12' then 'Invalid Transaction'
          end as Status,
   case tran_type
when '00' then 'Goods and Services'
when '01' then 'Cash Withdrawal'
when '31' then 'Balance Inquiry'
when '21' then 'Cash Deposit'
when '52' then 'Cash Deposit'
when '50' then 'Payment from Account'
when '92' then 'Pin Change'
end as [Trans Narration],     
 'Amount_response' =  (a.tran_amount_req/100),
 'Amount_Cash_Final' = (a.tran_amount_rsp/100),      
 a.from_account_id, a.to_account_id
 from post_tran a, post_tran_cust b
 where a.post_tran_cust_id = b.post_tran_cust_id
 and a.datetime_req between  '${startDate}' and '${endDate}'
 and a.datetime_req  between convert(varchar,'${startDate}',20) and convert(varchar,'${endDate}',20)
 and tran_type in ('00','01','40','50','21','52','31')
 and b.terminal_id = '${TransId}' `;
};
