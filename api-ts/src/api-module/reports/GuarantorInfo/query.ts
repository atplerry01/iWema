// Guarantor Info
export const getGuarantorInfo_QUERY = (callDate) => {   
    return `select Foracid "CustomersAccountNo",
    'NO' "GuaranteeStatusofLoan",
    'N/A' "TypeofGuarantee",
    'N/A' "NameofCorporateGuarantor",
    'N/A' "BizIDofCorporateGuarantor",
    'N/A' "IndividualGuarantorSurname",
    'N/A' "IndividualGuarantorFirstName",
    'N/A' "IndividualGuarntorMiddleName",
    'N/A' "GuarantorDOBIncorporation",
    'N/A' "GuarantorGender",
    'N/A' "GuarantorNationalId",
    'N/A' "GuarnatorIntlPassport",
    'N/A' "GuarantorDriversLicence",
    'N/A' "GuarantorBVN",
    'N/A' "GuarantorOtherID",
    'N/A' "GuarantorPrmyAddrLine1",
    'N/A' "GuarantorPrimaryAddrLine2",
    'N/A' "GuarantorPrimaryAddrCityLGA",
    'N/A' "GuarantorPrimaryState",
    'N/A' "GuarantorPrimaryCountry",
    'N/A' "GuarantorPrimaryPhonenumber",
    'N/A' "GuarantorEmailAddress"
    from
     (select ACID,FORACID,OPERATIVE_ACCT,ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,LOAN_AMT,BALANCE,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
    from custom.provision_special_i where curr_class_date = '${callDate}' AND BALANCE < 0
    union 
    select ACID,FORACID,OPERATIVE_ACCT,ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,LOAN_AMT,BALANCE,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
    from custom.provision_details_i where curr_class_date = '${callDate}' AND BALANCE < 0
    union
    select ACID,FORACID,FORACID "OPERATIVE_ACCT",ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,SANCT_LIM,OD_AMT,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
    from custom.provision_overdraft_i  where curr_class_date = '${callDate}' AND OD_AMT < 0)`;        
};
