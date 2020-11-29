export const getTraceQuery = (_accountNumber, _startDate, _endDate) => {
  // tslint:disable-next-line: max-line-length
  return `select
  distinct (retrieval_reference_nr),terminal_id,pan,
  auth_id_rsp,system_trace_audit_nr, message_type,tran_type,tran_currency_code,abort_rsp_code,datetime_req,
  rsp_code_rsp,card_acceptor_name_loc,from_account_id,to_account_id,tran_amount_req,settle_amount_rsp,settle_amount_impact
  from post_tran a, post_tran_cust b
  where a.post_tran_cust_id=b.post_tran_cust_id
  `;
};

export const getTraceQueryWithAccountOnly = (accountNumber, _startDate, _endDate) => {
  return `select
  distinct (retrieval_reference_nr),terminal_id,pan,
  auth_id_rsp,system_trace_audit_nr, message_type,tran_type,tran_currency_code,abort_rsp_code,datetime_req,
  rsp_code_rsp,card_acceptor_name_loc,from_account_id,to_account_id,tran_amount_req,settle_amount_rsp,settle_amount_impact
  from post_tran a, post_tran_cust b
  where a.post_tran_cust_id=b.post_tran_cust_id
  and from_account_id = '${accountNumber}'
  `;
}

export const getTraceQueryWithDateOnly = (_accountNumber, startDate, endDate) => {
  return `select
  distinct (retrieval_reference_nr),terminal_id,pan,
  auth_id_rsp,system_trace_audit_nr, message_type,tran_type,tran_currency_code,abort_rsp_code,datetime_req,
  rsp_code_rsp,card_acceptor_name_loc,from_account_id,to_account_id,tran_amount_req,settle_amount_rsp,settle_amount_impact
  from post_tran a, post_tran_cust b
  where a.post_tran_cust_id=b.post_tran_cust_id
  and a. datetime_tran_local BETWEEN  '${startDate}' and '${endDate}'
  `;
}