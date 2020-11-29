// MandateByBranchWith
// MandateByProduct
//startDate: any
export const getCorporatePrincipalQuery = (startDate) => {
  // tslint:disable-next-line: max-liness-length
  return `  
  Select distinct a.Orgkey "Customer Id",
  G.CUST_Last_Name "Principal Officer 1 Surname",
  G.CUST_First_Name "Principal Off1 Firstname",
  G.Cust_Middle_Name "Principal Off Midnme",
  G.CUST_DOB "Date Of Birth",
  Str15 "Gender",
  G.Address_Line1 "Primary Address Line 1",
  G.Address_Line2 "Primary Address Line 2", 
  G.CITY "City",
  to_char('0' || nvl(G.state,'25')) as "State",
  nvl(G.country,'NG') as "Country",
  --NVL((Select Localetext State From Crmuser.Categories P, Crmuser.Category_Lang Q Where P.Categoryid=Q.Categoryid And Categorytype='STATE' And Value=G.State),'LAGOS')State,
  --nvl( G.Country,'NG')COUNTRY,
  Substr((select REFERENCENUMBER from crmuser.entitydocument where doccode= 'NATID' and ORGKEY= B.cif_id and PREFERREDUNIQUEID='Y'),1,15)"National ID",
  substr(G.Licenseno,1,15)"Drivers License No",
  substr(G.Purgeremarks,1,11)"BVN No",
  Substr(G.Passportno,1,15)"Passport No",
  substr((Select Replace(Replace(Replace(Nvl(Phoneno,0),'(',''),')',''),'+234','0') From Crmuser.Phoneemail Where Orgkey = B.Cif_Id And Phoneoremail='PHONE' And Preferredflag='Y'  and rownum=1),1,15) As "Phone No",
  substr((Select EMAIL From Crmuser.Phoneemail Where Orgkey = B.Cif_Id And Phoneoremail='EMAIL' And Preferredflag='Y'  and rownum=1),1,15) As "EMAIL Address",
  '       ' as "Position In Business",
  '       ' as "Principal Officer 2 Surname",
  '       ' as "Principal Officer 2 Firstname",
  '       ' as "Principal Officer 2 Middlename",
  '       ' as "Date Of Birth",
  '       ' as "Gender",
  '       ' as "Primary Address Line 1",
  '       ' as "Primary Address Line 2",
  '       ' as "City",
  '       ' as "State",
  '       ' as "Country",
  '       ' as "National ID",
  '       ' as "Drivers License No",
  '       ' as "BVN No",
  '       ' as "Passport No",
  '       ' as "Phone No1",
  '       ' as "Email Address",
  '       ' as "Position In Business",
  '       ' as "Phone No 2",
  '       ' as "Secondary Address",
  '       ' as "CITY",
  '       ' as "STATE",
  '       ' as "TAX ID",
  '       ' as "PICTURE FILE PATH"
   From Crmuser.Beneficialowner A, 
  Tbaadm.Gam B,crmuser.accounts G Where A.Orgkey=B.Cif_Id 
  And A.Entitykey=G.orgkey And B.Acct_Cls_Flg!='Y'  And B.Del_Flg!='Y'
  AND B.SCHM_TYPE IN ('ODA','LAA')
  
  
  and b.acid in 
  (select ACID
  from custom.provision_special_i where curr_class_date = '${startDate}' AND BALANCE < 0
  union 
  select ACID
  from custom.provision_details_i where curr_class_date = '${startDate}' AND BALANCE < 0
  union
  select ACID
  from custom.provision_overdraft_i  where curr_class_date = '${startDate}' AND OD_AMT < 0)
  `;
};
