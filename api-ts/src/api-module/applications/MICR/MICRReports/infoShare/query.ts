
export const getInfoShareQuery = (startDate, endDate) => {
  // tslint:disable-next-line: max-line-length
  return `select a.foracid ACCOUNT_NUMBER,acct_name,init_brnch,b.sol_desc initiating_branch_name,collectn_brnch,c.sol_desc collectin_branch_name,no_of_leaves,a.rcre_time Request_initiated,micr_gen_time MICR_GENERATED,micr_disp_time MICR_DISPATCHED,user_ack_time BRANCH_ACKNOWLEDGE,nobook NO_OF_BOOKLET,user_ack_time CustomerPickupTime from custom.chqreq a,tbaadm.gam,tbaadm.sol b,tbaadm.sol c where gam.foracid= a.foracid and a.init_brnch = b.sol_id and a.collectn_brnch =c.sol_id and event_flg <>'R' and a.rcre_time between '${startDate}' and '${endDate}'`;
};

export const getBtsWebQuery = (startDate, endDate) => {
  // tslint:disable-next-line: max-line-length
  return `select accountno,origBranchCode, convert(varchar(50),extra1,100) [PrintDate],
  convert(varchar(50),extra2,100) [AssignedDate],convert(varchar(50),downloaddate,100) [GeneratedDate],
  convert(varchar(50),DispatchDate,100)[DispatchDate] from requests 
  where cast(downloadDate as date) between '${startDate}' and '${endDate}'`;
};
