export const getStaffAccouthWithStaffId_QUERY = (staffNo) => {
    return `select a.foracid accountnumber,a.cif_id customerid,a.emp_id from tbaadm.gam a
                            where acct_ownership = 'E' and a.emp_id = '${staffNo}' and a.acct_cls_flg = 'N' 
                            and ROWNUM = 1`;
};
