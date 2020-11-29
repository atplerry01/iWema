export const getTodayBirthay_Customers_QUERY = () => {
    return `select distinct e.orgkey,NVL(d.email,\'n/a\') email, 
    replace(replace(replace(nvl(d.phoneno,0),\'(\',\'\'),\')\',\'\'),\'+234\',\'0\') PhoneNum,
    e.CUST_DOB, CUST_FIRST_NAME,CUST_LAST_NAME,e.BIRTH_MONTH,e.BIRTH_DAY from crmuser.accounts e,
    tbaadm.gam f,(select b.orgkey ,A.email,B.phoneno from (select orgkey,email from CRMUSER.PHONEEMAIL 
        where email is not null and PREFERREDFLAG=\'Y\') a, (select orgkey,phoneno from CRMUSER.PHONEEMAIL 
            where phoneno is not null and PREFERREDFLAG=\'Y\') b where a.orgkey(+) =b.orgkey) d 
            where(e.orgkey = d.orgkey) and e.orgkey = f.cif_id and substr(f.CIF_id,1,1)= \'R\'  
            and to_char(e.CUST_DOB,\'DD-MM\') = to_char(sysdate,\'DD-MM\')     
            AND  F.ACCT_CLS_FLG =\'N\' and F.DEL_FLG=\'N\' order by  e.orgkey, e.Cust_Last_Name`;
};
