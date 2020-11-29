export const getThisMonthCustomerBirthdayByCustomerID_QUERY = customerid => {

    return `select e.CUST_DOB dob from crmuser.accounts e 
                            where to_char(e.CUST_DOB,'MM') = to_char(sysdate,'MM')
                            and ORGKEY='${customerid}'`;
};
