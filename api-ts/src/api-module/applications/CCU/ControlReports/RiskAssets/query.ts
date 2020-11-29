
export const getODAWithOutDateQuery = () => {
    return `select a.*, b.Acct_CRNCY_CODE,c.sol_desc,' ' as Zone from custom.provision_overdraft_i a Join tbaadm.gam b on a.ACID = b.ACID   join tbaadm.sol c on b.sol_id = C.sol_id`;
};

export const getODAWithDateQuery = (endDate: any) => {
    return `select a.*, b.Acct_CRNCY_CODE,c.sol_desc,' ' as Zone from custom.provision_overdraft_i a Join tbaadm.gam b on a.ACID = b.ACID   join tbaadm.sol c on b.sol_id = C.sol_id  where CURR_CLASS_DATE = '${endDate}'`;
};


export const getSpecifiedWithOutDateQuery = () => {
    return `select a.*, b.Acct_CRNCY_CODE,c.sol_desc,' ' as Zone from custom.provision_special_i a Join tbaadm.gam b on a.ACID = b.ACID join tbaadm.sol c on c.sol_id = a.sol_id`;
};

export const getSpecifiedWithDateQuery = (endDate: any) => {
    return `select a.*, b.Acct_CRNCY_CODE,c.sol_desc,' ' as Zone from custom.provision_special_i a Join tbaadm.gam b on a.ACID = b.ACID join tbaadm.sol c on c.sol_id = a.sol_id where CURR_CLASS_DATE = '${endDate}'`;
};


export const getNonSpecifiedWithOutDateQuery = () => {
    return `Select a.*, b.Acct_CRNCY_CODE,c.sol_desc,' ' as Zone from custom.provision_details_i a join tbaadm.gam b on a.acid = b.acid join tbaadm.sol c on c.sol_id = a.sol_id;`;
};

export const getNonSpecifiedWithDateQuery = (endDate: any) => {
    return `Select a.*, b.Acct_CRNCY_CODE,c.sol_desc,' ' as Zone from custom.provision_details_i a join tbaadm.gam b on a.acid = b.acid join tbaadm.sol c on c.sol_id = a.sol_id where CURR_CLASS_DATE = '${endDate}'`;
};
