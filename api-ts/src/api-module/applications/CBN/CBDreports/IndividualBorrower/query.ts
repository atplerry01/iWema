// MandateByBranchWith
// MandateByProduct
//startDate: any
export const getIndividualBorrowerQuery = (startDate) => {
  // tslint:disable-next-line: max-line-length
  return `  
  Select 
  substr(a.Cif_Id,1,20)as "CUSTOMERID",
  substr(x.Sol_Id,1,20)"Branch Code",
  substr(B.Cust_Last_Name,1,25)"Surname",
  substr(Cust_First_Name,1,25)"First Name",
  substr(Cust_Middle_Name,1,25)"Middle Name",
  substr(to_Char(Cust_Dob,'dd/MM/YYYY'),1,10)"Date Of Birth",
  Substr((select REFERENCENUMBER from crmuser.entitydocument where doccode= 'NATID' and ORGKEY= a.cif_id and PREFERREDUNIQUEID='Y' And Rownum=1),1,15)"National Identity Number",
  substr(Licenseno,1,15)"Drivers License No", substr(B.Purgeremarks,1,11)"BVN No",
  Substr(B.Passportno,1,15)"Passport No",
  Substr(Decode(Gender,'M','M','F'),1,1)Gender,
  nvl(CASE to_char(b.country) WHEN 'null' THEN 'NG' END,'NG') NATIONALITY,
   CASE TO_CHAR((Select Marital_Status From Crmuser.Demographic Where Orgkey = A.Cif_Id And Rownum=1)) when 'UNNON' then 'M' WHEN 'SINGL' THEN 'S' WHEN 'MRIED' THEN 'M' WHEN 'WIDOW' THEN 'WD' WHEN 'DVRCD' THEN 'D' ELSE 'S' END "Marital Status",
   substr((Select Replace(Replace(Replace(Nvl(Phoneno,0),'(',''),')',''),'+234','0') From Crmuser.Phoneemail Where Orgkey = A.Cif_Id And Phoneoremail='PHONE' And Preferredflag='Y'  and rownum=1),1,15) As "Mobile No",
   substr(nvl(B.Address_Line1,'54 Marina Lagos'),1,50) "Primary Address Line 1",
   substr(nvl(b.Address_Line2,'54 Marina Lagos'),1,50) "Primary Address Line 2",
   (Select Localetext City From Crmuser.Categories X, Crmuser.Category_Lang Q Where X.Categoryid=Q.Categoryid And Categorytype='CITY' And Value=B.city And Rownum=1) "Primary city / LGA",
   Substr(NVL((Select Localetext State From Crmuser.Categories P, Crmuser.Category_Lang Q Where P.Categoryid=Q.Categoryid And Categorytype='STATE' And Value=B.State And Rownum=1),'LAGOS'),1,15)"Primary State",
  nvl(CASE to_char(b.country) WHEN 'null' THEN 'NG' END,'NG') "Primary Country",
  nvl( CASE to_char(b.CUST_STAFF_STATUS) WHEN 'null' THEN 'SE' END,'SE') "Employment Status",
   occupation,
   c.Industry_type "Business Category", 
   B.Sector "Business Sector",
   case to_char(substr(a.cif_id,1,1)) WHEN 'R' THEN 'I' END "BORROWER TYPE",
   '       ' as "Other Id",
   '       ' as "Tax Id",
   '       ' as "Picture File Path",
   '       ' as "Email Address",
   '       ' as "Employer Name",
   '       ' as "Employer Address Line 1",
   '       ' as "Employer Address Line 2",
   '       ' as "Employer City",
   '       ' as "Employer State",
   '       ' as "Employer Country",
   '       ' as "Title",
   '       ' as "Place Of Birth",
   '       ' as "Work Phone",
   '       ' as "Home Phone",
   '       ' as "Secondary Address Line 1",
   '       ' as "Secondary Address Line 2",
   '       ' as "Secondary Address City / LGA",
   '       ' as "Secondary Address State",
   '       ' as "Secondary Address Country",
   '       ' as "Spouse's Surname",
   '       ' as "Spouse's First Name",
   '       ' as "Spouse's Middle Name"
   
  From
   (select ACID,FORACID,OPERATIVE_ACCT,ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,LOAN_AMT,BALANCE,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
  from custom.provision_special_i where curr_class_date = '${startDate}' AND BALANCE < 0
  union 
  select ACID,FORACID,OPERATIVE_ACCT,ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,LOAN_AMT,BALANCE,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
  from custom.provision_details_i where curr_class_date = '${startDate}' AND BALANCE < 0
  union
  select ACID,FORACID,FORACID "OPERATIVE_ACCT",ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,SANCT_LIM,OD_AMT,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
  from custom.provision_overdraft_i  where curr_class_date = '${startDate}' AND OD_AMT < 0) x
  join Tbaadm.Gam A on x.acid = a.acid
  Join Crmuser.Accounts B
  On A.Cif_Id = B.Orgkey
  join tbaadm.gac c on a.acid = c.acid and 
  A.Acct_Cls_Flg!='Y'  And A.Del_Flg!='Y'
  and A.SCHM_TYPE IN ('LAA','ODA')
  AND substr(a.cif_id,1,1) = 'R'
  AND B.PURGEREMARKS IS NOT NULL
  `;
};
