
export const getReportHeaderQuery = (startDate, endDate) => {
  // tslint:disable-next-line: max-line-length
  return `select a.foracid ACCOUNT_NUMBER,acct_name,init_brnch,b.sol_desc initiating_branch_name,collectn_brnch,c.sol_desc collectin_branch_name,no_of_leaves,a.rcre_time Request_initiated,micr_gen_time MICR_GENERATED,micr_disp_time MICR_DISPATCHED,user_ack_time BRANCH_ACKNOWLEDGE,nobook NO_OF_BOOKLET,user_ack_time CustomerPickupTime from custom.chqreq a,tbaadm.gam,tbaadm.sol b,tbaadm.sol c where gam.foracid= a.foracid and a.init_brnch = b.sol_id and a.collectn_brnch =c.sol_id and event_flg <>'R' and a.rcre_time between '${startDate}' and '${endDate}'`;
};
