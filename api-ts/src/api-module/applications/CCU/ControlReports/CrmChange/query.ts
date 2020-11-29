export const getCRMChangeQuery = (_endDate: any) => {
    return `select a.*, b.Acct_CRNCY_CODE,c.sol_desc,' ' as Zone from custom.provision_special_i a Join tbaadm.gam b on a.ACID = b.ACID join tbaadm.sol c on c.sol_id = a.sol_id where a.CURR_CLASS_DATE = '10-july-2019'`;
};
