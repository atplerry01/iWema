export const getOnUsQuery = () => {
  // tslint:disable-next-line: max-line-length
  return `SELECT COUNT (PAN) AS "PAN_Transaction", 
  SUM(settle_amount_rsp)/100 "Total tran_amount_req", terminal_id as ATM_ID, card_acceptor_name_loc as "Location" 
  from post_tran a,post_tran_cust b (NOLOCK)
  where a.post_tran_cust_id = b.post_tran_cust_id
  and left(pan,6) in ('457806','457803','457804','457805','457807','463958','559466','559441','559453','521958','506119','536902')
  and datetime_req between '2020-01-01 00:00:00.000' and  '2020-01-31 23:59:59.999'
  and a.message_type in ('0200')
  and terminal_id like '1035%'
  and pos_terminal_type = '02'
  and card_acceptor_name_loc like '%NG'
  and tran_reversed <> 2
  and settle_amount_rsp !='0'
  and rsp_code_rsp= '00'
  and a.sink_node_name in ('WEMAFINsnk','WEMFINsnk')
  and tran_postilion_originated ='0'
  GROUP BY terminal_id, card_acceptor_name_loc
  order by pan_transaction desc
  
  `;
};
