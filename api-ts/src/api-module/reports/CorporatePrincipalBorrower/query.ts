
// oracle: Corporate Principal Borrow June 2017
export const getCorporatePrincipalBorrower_QUERY = (callDate) => {
    return `Select distinct a.Orgkey "CustomerId",
G.CUST_Last_Name "PrincipalOfficer1Surname",
G.CUST_First_Name "PrincipalOff1Firstname",
G.Cust_Middle_Name "PrincipalOffMidnme",
G.CUST_DOB "DateOfBirth",
Str15 "Gender",
G.Address_Line1 "PrimaryAddressLine1",
G.Address_Line2 "PrimaryAddressLine2", 
G.CITY "City",
to_char('0' || nvl(G.state,'25')) as "State",
nvl(G.country,'NG') as "Country",
--NVL((Select Localetext State From Crmuser.Categories P, Crmuser.Category_Lang Q Where P.Categoryid=Q.Categoryid And Categorytype='STATE' And Value=G.State),'LAGOS')State,
--nvl( G.Country,'NG')COUNTRY,
Substr((select REFERENCENUMBER from crmuser.entitydocument where doccode= 'NATID' and ORGKEY= B.cif_id and PREFERREDUNIQUEID='Y'),1,15)"NationalID",
substr(G.Licenseno,1,15)"DriversLicenseNo",
substr(G.Purgeremarks,1,11)"BVNNo",
Substr(G.Passportno,1,15)"PassportNo",
substr((Select Replace(Replace(Replace(Nvl(Phoneno,0),'(',''),')',''),'+234','0') From Crmuser.Phoneemail Where Orgkey = B.Cif_Id And Phoneoremail='PHONE' And Preferredflag='Y'  and rownum=1),1,15) As "PhoneNo",
substr((Select EMAIL From Crmuser.Phoneemail Where Orgkey = B.Cif_Id And Phoneoremail='EMAIL' And Preferredflag='Y'  and rownum=1),1,15) As "EMAILAddress",
'       ' as "PositionInBusiness",
'       ' as "PrincipalOfficer2Surname",
'       ' as "PrincipalOfficer2Firstname",
'       ' as "PrincipalOfficer2Middlename",
'       ' as "DateOfBirth",
'       ' as "Gender",
'       ' as "PrimaryAddressLine1",
'       ' as "PrimaryAddressLine2",
'       ' as "City",
'       ' as "State",
'       ' as "Country",
'       ' as "NationalID",
'       ' as "DriversLicenseNo",
'       ' as "BVNNo",
'       ' as "PassportNo",
'       ' as "PhoneNo1",
'       ' as "EmailAddress",
'       ' as "PositionInBusiness",
'       ' as "PhoneNo2",
'       ' as "SecondaryAddress",
'       ' as "CITY",
'       ' as "STATE",
'       ' as "TAXID",
'       ' as "PICTUREFILEPATH"
From Crmuser.Beneficialowner A, 
Tbaadm.Gam B,crmuser.accounts G Where A.Orgkey=B.Cif_Id 
And A.Entitykey=G.orgkey And B.Acct_Cls_Flg!='Y'  And B.Del_Flg!='Y'
AND B.SCHM_TYPE IN ('ODA','LAA')
and b.acid in 
(select ACID
from custom.provision_special_i where curr_class_date = '${callDate}' AND BALANCE < 0
union 
select ACID
from custom.provision_details_i where curr_class_date = '${callDate}' AND BALANCE < 0
union
select ACID
from custom.provision_overdraft_i  where curr_class_date = '${callDate}' AND OD_AMT < 0)`;        
};
