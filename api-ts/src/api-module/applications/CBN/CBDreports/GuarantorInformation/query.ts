// MandateByBranchWith
// MandateByProduct
//startDate: any
export const getGuarantorInformationQuery = (startDate) => {
  // tslint:disable-next-line: max-line-length
  return `  
  select Foracid "Customer's Account No",
  'NO' "Guarantee Status of Loan",
  'N/A' "Type of Guarantee",
  'N/A' "Name of Corporate Guarantor",
  'N/A' "BizID of Corporate Guarantor ",
  'N/A' "Individual Guarantor's Surname",
  'N/A' "Individual Guarantor FirstName",
  'N/A' "Individual Guarntor MiddleName",
  'N/A' "Guarantor DOB Incorporation",
  'N/A' "Guarantor's Gender",
  'N/A' "Guarantor's National ID",
  'N/A' "Guarnator Intl Passport #",
  'N/A' "Guarantor Drivers Licence #",
  'N/A' "Guarantor's BVN ",
  'N/A' "Guarantor's Other ID",
  'N/A' "Guarantor Prmy Addr Line 1",
  'N/A' "Guarantor Prmy Addr Line 2",
  'N/A' "Guarantor Prm Addr City/LGA",
  'N/A' "Guarantor's Primary State",
  'N/A' "Guarantor's Primary Country",
  'N/A' "Guarantor's PrmY Phone number",
  'N/A' "Guarantor's E-mail Address"
  from
   (select ACID,FORACID,OPERATIVE_ACCT,ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,LOAN_AMT,BALANCE,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
  from custom.provision_special_i where curr_class_date = '${startDate}' AND BALANCE < 0
  union 
  select ACID,FORACID,OPERATIVE_ACCT,ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,LOAN_AMT,BALANCE,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
  from custom.provision_details_i where curr_class_date = '${startDate}' AND BALANCE < 0
  union
  select ACID,FORACID,FORACID "OPERATIVE_ACCT",ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,SANCT_LIM,OD_AMT,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
  from custom.provision_overdraft_i  where curr_class_date = '${startDate}' AND OD_AMT < 0) X
  `;
};
