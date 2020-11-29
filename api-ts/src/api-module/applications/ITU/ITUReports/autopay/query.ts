export const getAutopayQuery = () => {
  // tslint:disable-next-line: max-line-length
  return `select datetime_req,pan,system_trace_audit_nr,retrieval_reference_nr,pos_terminal_type,tran_type,rsp_code_rsp,terminal_id,
  tran_amount_req,tran_amount_rsp,tran_cash_req,tran_cash_rsp,settle_amount_req, settle_amount_rsp,tran_tran_fee_req,tran_tran_fee_rsp,
  settle_tran_fee_req,settle_tran_fee_rsp,tran_currency_code,settle_currency_code,tran_proc_fee_currency_code,
  auth_id_rsp,card_product,sink_node_name,source_node_name, from_account_id,to_account_id,message_type,card_acceptor_name_loc
  from post_tran a,post_tran_cust b
  where a.post_tran_cust_id = b.post_tran_cust_id
  and sink_node_name in ('WEMFINsnk','WEMAFINsnk')
  and message_type in('0100','0200')
  and pos_terminal_type NOT IN ('02','01')
  and card_acceptor_id_code like 'Autopay%'
  and rsp_code_rsp in ('00')
  and datetime_req between  '2020-02-09 00:00:00.000' and  '2020-02-10 23:59:59.999'
  and tran_postilion_originated ='1'
  `;
};
