// Individual Borrower:
export const getIndividualBorrower_QUERY = (callDate) => {  
    return `Select 
    substr(a.Cif_Id,1,20)as "CustomerId",
    substr(x.Sol_Id,1,20)"BranchCode",
    substr(B.Cust_Last_Name,1,25)"Surname",
    substr(Cust_First_Name,1,25)"FirstName",
    substr(Cust_Middle_Name,1,25)"MiddleName",
    substr(to_Char(Cust_Dob,'dd/MM/YYYY'),1,10)"DateOfBirth",
    Substr((select REFERENCENUMBER from crmuser.entitydocument where doccode= 'NATID' and ORGKEY= a.cif_id and PREFERREDUNIQUEID='Y' And Rownum=1),1,15)"NationalIdentityNumber",
    substr(Licenseno,1,15)"DriversLicenseNo", substr(B.Purgeremarks,1,11)"BVNNo",
    Substr(B.Passportno,1,15)"PassportNo",
    Substr(Decode(Gender,'M','M','F'),1,1)Gender,
    nvl(CASE to_char(b.country) WHEN 'null' THEN 'NG' END,'NG') NATIONALITY,
     CASE TO_CHAR((Select Marital_Status From Crmuser.Demographic Where Orgkey = A.Cif_Id And Rownum=1)) when 'UNNON' then 'M' WHEN 'SINGL' THEN 'S' WHEN 'MRIED' THEN 'M' WHEN 'WIDOW' THEN 'WD' WHEN 'DVRCD' THEN 'D' ELSE 'S' END "MaritalStatus",
     substr((Select Replace(Replace(Replace(Nvl(Phoneno,0),'(',''),')',''),'+234','0') From Crmuser.Phoneemail Where Orgkey = A.Cif_Id And Phoneoremail='PHONE' And Preferredflag='Y'  and rownum=1),1,15) As "MobileNo",
     substr(nvl(B.Address_Line1,'54 Marina Lagos'),1,50) "PrimaryAddressLine1",
     substr(nvl(b.Address_Line2,'54 Marina Lagos'),1,50) "PrimaryAddressLine2",
     (Select Localetext City From Crmuser.Categories X, Crmuser.Category_Lang Q Where X.Categoryid=Q.Categoryid And Categorytype='CITY' And Value=B.city And Rownum=1) "Primarycity/LGA",
     Substr(NVL((Select Localetext State From Crmuser.Categories P, Crmuser.Category_Lang Q Where P.Categoryid=Q.Categoryid And Categorytype='STATE' And Value=B.State And Rownum=1),'LAGOS'),1,15)"PrimaryState",
    nvl(CASE to_char(b.country) WHEN 'null' THEN 'NG' END,'NG') "PrimaryCountry",
    nvl( CASE to_char(b.CUST_STAFF_STATUS) WHEN 'null' THEN 'SE' END,'SE') "EmploymentStatus",
     occupation,
     c.Industry_type "BusinessCategory", 
     B.Sector "BusinessSector",
     case to_char(substr(a.cif_id,1,1)) WHEN 'R' THEN 'I' END "BORROWER TYPE",
     '       ' as "OtherId",
     '       ' as "TaxId",
     '       ' as "PictureFilePath",
     '       ' as "EmailAddress",
     '       ' as "EmployerName",
     '       ' as "EmployerAddressLine1",
     '       ' as "EmployerAddressLine2",
     '       ' as "EmployerCity",
     '       ' as "EmployerState",
     '       ' as "EmployerCountry",
     '       ' as "Title",
     '       ' as "PlaceOfBirth",
     '       ' as "WorkPhone",
     '       ' as "HomePhone",
     '       ' as "SecondaryAddressLine1",
     '       ' as "SecondaryAddressLine2",
     '       ' as "SecondaryAddressCityLGA",
     '       ' as "SecondaryAddressState",
     '       ' as "SecondaryAddressCountry",
     '       ' as "SpouseSurname",
     '       ' as "SpouseFirstName",
     '       ' as "SpouseMiddleName"
     
    From
     (select ACID,FORACID,OPERATIVE_ACCT,ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,LOAN_AMT,BALANCE,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
    from custom.provision_special_i where curr_class_date = '${callDate}' AND BALANCE < 0
    union 
    select ACID,FORACID,OPERATIVE_ACCT,ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,LOAN_AMT,BALANCE,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
    from custom.provision_details_i where curr_class_date = '${callDate}' AND BALANCE < 0
    union
    select ACID,FORACID,FORACID "Operative_Acct",ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,SANCT_LIM,OD_AMT,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
    from custom.provision_overdraft_i  where curr_class_date = '${callDate}' AND OD_AMT < 0) x
    join Tbaadm.Gam A on x.acid = a.acid
    Join Crmuser.Accounts B
    On A.Cif_Id = B.Orgkey
    join tbaadm.gac c on a.acid = c.acid and 
    A.Acct_Cls_Flg!='Y'  And A.Del_Flg!='Y'
    and A.SCHM_TYPE IN ('LAA','ODA')
    AND substr(a.cif_id,1,1) = 'R'
    AND B.PURGEREMARKS IS NOT NULL`;        
};
