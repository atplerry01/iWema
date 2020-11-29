 // oracle : Corporate Borrower Information
 export const getCorporateBorrowInfo_QUERY = (callDate) => {
    return `select replace(nvl(a.REGISTRATION_NUMBER, 'N/A'),'|','-') as "BusinessIdentificationNumber",
    substr(to_char(a.CORPORATE_NAME),1,60) as "BusinessName",
    nvl((select Localetext From crmuser.corporate p,Crmuser.Categories w, Crmuser.Category_Lang y 
        Where w.Categoryid=y.Categoryid And Categorytype='LEGAL_ENTITY' and value = legalentity_type and p.corp_key = a.corp_key),'SOLE PROPRIETOR')as "BusinessCorporateType",
    substr(nvl((select nvl(CBN_Category,'40180') from Custom.CRCBIZCATEGORY 
    where category_code in ((select value From crmuser.corporate p,Crmuser.Categories w, 
        Crmuser.Category_Lang y Where w.Categoryid=y.Categoryid And Categorytype='BUS_TYPE' and value = business_type and p.corp_key = a.corp_key))),'Others/Miscelaneous'),1,20)
     as "BusinessCategory",
    substr(to_Char(DATE_OF_INCORPORATION,'dd/MM/YYYY'),1,10) "DateOfIncorporation" ,
    
    a.CORP_KEY as "CustomerID",
    x.sol_id as "CustomersBranchCode",
    substr(address_line1,1,50) as "BusinessOfficeAddressLine1",
    Substr(address_line2,1,20) as "BusinessOfficeAddressLine2",
    city as "CityLGA", 
    CASE to_char('0' || nvl(state,'25')) WHEN '0550' THEN '025' END as "State",
    nvl(country,'NG') as "Country",
    (select email from crmuser.phoneemail where orgkey = b.cif_id and phoneoremail = 'email' and  preferredflag = 'Y')as "EmailAddress",
    '      ' as "SecondaryAddressLine1",
    '      ' as "SecondaryAddressLine2",
    '      ' "City/LGA", 
    '      ' "State",
    '      ' as "Country", 
    '      ' as "TaxID",
    '      ' as "SecondaryPhoneNumber"
    from
    
     (select ACID,FORACID,OPERATIVE_ACCT,ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,LOAN_AMT,BALANCE,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
    from custom.provision_special_i where curr_class_date = '${callDate}' AND BALANCE < 0
    union 
    select ACID,FORACID,OPERATIVE_ACCT,ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,LOAN_AMT,BALANCE,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
    from custom.provision_details_i where curr_class_date = '${callDate}' AND BALANCE < 0
    union
    select ACID,FORACID,FORACID "OPERATIVE_ACCT",ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,SANCT_LIM,OD_AMT,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
    from custom.provision_overdraft_i  where curr_class_date = '${callDate}' AND OD_AMT < 0) X,tbaadm.gam b, crmuser.corporate a
    where x.acid = b.acid(+) and  B.Acct_Cls_Flg!='Y'  And B.Del_Flg!='Y' and
     a.corp_key =b.cif_id and B.SCHM_TYPE IN ('LAA','ODA')
    AND substr(B.cif_id,1,1) = 'C'`;        
};
