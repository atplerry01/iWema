
export const getDQIReportQuery = (startDate) => {
  // tslint:disable-next-line: max-line-length
  return `SELECT A.CIF_ID,A.FORACID,A.ACCT_NAME,A.SCHM_CODE, E.SCHM_DESC,A.ACCT_OPN_DATE,C.SOL_ID, C.SOL_DESC, G.set_desc ZONE,B.PHONENO,CUSTOM.GETBVN(FORACID) BVN, F.EMAIL, 
  (SELECT REF_DESC FROM TBAADM.RCT WHERE REF_CODE=D.OCCUPATION) OCCUPATION,(select substr(localetext,16,length(localetext)-16) from crmuser.category_lang g, crmuser.categories s
  where g.categoryid=s.categoryid and d.cust_commu_code=value and categorytype='COMMUNITY_CODE') RELIGION,(select TAXID from CRMUSER.corporate where corp_key=a.cif_id) TIN,
  decode(channel_id,'ONWEB','ONLINE WEB','WAL','WALLET','AGBK','AGENT BANKING',null,'INBRANCH','ALAT','ALAT')CHANNEL
  FROM TBAADM.GAM A, CRMUSER.PHONEEMAIL B, TBAADM.SOL C, CRMUSER.ACCOUNTS D,TBAADM.GSP E, CRMUSER.PHONEEMAIL F,(select sol_id,set_desc from tbaadm.stid a,
  tbaadm.sst b where a.set_id=b.set_id and a.set_id like 'Z%') G
  WHERE (((length(B.phonenocitycode)=3) and (LENGTH(B.phonenocountrycode||B.phonenocitycode||B.phonenolocalcode) < 13 OR B.PHONENO IS null))
  OR (A.SCHM_CODE NOT IN ('64001','64002') AND(custom.getbvn(foracid) is null or custom.getbvn(foracid) ='null' OR length(custom.getbvn(foracid)) < 11))
  OR ((A.SCHM_CODE NOT IN '60002') and (A.cif_id NOT LIKE ('C%') and (D.OCCUPATION is null or D.OCCUPATION='null')))
  OR (F.EMAIL NOT LIKE '%@%.%')
  OR (((select TAXID from CRMUSER.corporate where corp_key=a.cif_id) is null) and cif_id not like 'R%')
  OR (d.cust_commu_code is null) and (A.cif_id NOT LIKE ('C%')))
  AND A.CIF_ID=B.ORGKEY
  AND A.SCHM_CODE=E.SCHM_CODE
  AND A.SOL_ID=G.SOL_ID
  AND A.SOL_ID=C.SOL_ID
  AND A.CIF_ID=D.ORGKEY
  AND A.CIF_ID=F.ORGKEY
  --and A.sol_id='069'
  AND A.ACCT_OWNERSHIP !='O'
  AND A.SCHM_CODE NOT IN ('10009','10010','40001','10015')
  AND B.PHONEOREMAIL='PHONE'
  AND F.PHONEOREMAIL='EMAIL'
  AND A.SOL_ID NOT IN ('999','900')
  AND A.SCHM_TYPE IN ('SBA','ODA')
  and foracid not like 'ZZ%'
  and acct_opn_date >= '${startDate}'
  AND A.ACCT_CLS_FLG='N'
  AND A.DEL_FLG='N'  
  `;
}; //

export const getDQIReportByZoneQuery = (startDate, zone) => {
  return `
  SELECT A.CIF_ID,A.FORACID,A.ACCT_NAME,A.SCHM_CODE, E.SCHM_DESC,A.ACCT_OPN_DATE,C.SOL_ID, C.SOL_DESC, G.set_desc ZONE,B.PHONENO,CUSTOM.GETBVN(FORACID) BVN, F.EMAIL,
(SELECT REF_DESC FROM TBAADM.RCT WHERE REF_CODE=D.OCCUPATION) OCCUPATION,(select substr(localetext,16,length(localetext)-16) from crmuser.category_lang g, crmuser.categories s
where g.categoryid=s.categoryid and d.cust_commu_code=value and categorytype='COMMUNITY_CODE') RELIGION,(select TAXID from CRMUSER.corporate where corp_key=a.cif_id) TIN,
decode(channel_id,'ONWEB','ONLINE WEB','WAL','WALLET','AGBK','AGENT BANKING',null,'INBRANCH','ALAT','ALAT')CHANNEL
FROM TBAADM.GAM A, CRMUSER.PHONEEMAIL B, TBAADM.SOL C, CRMUSER.ACCOUNTS D,TBAADM.GSP E, CRMUSER.PHONEEMAIL F,(select sol_id,set_desc from tbaadm.stid a,
tbaadm.sst b where a.set_id=b.set_id and a.set_id like 'Z%') G
WHERE (((length(B.phonenocitycode)=3) and (LENGTH(B.phonenocountrycode||B.phonenocitycode||B.phonenolocalcode) < 13 OR B.PHONENO IS null))
OR (A.SCHM_CODE NOT IN ('64001','64002') AND(custom.getbvn(foracid) is null or custom.getbvn(foracid) ='null' OR length(custom.getbvn(foracid)) < 11))
OR ((A.SCHM_CODE NOT IN '60002') and (A.cif_id NOT LIKE ('C%') and (D.OCCUPATION is null or D.OCCUPATION='null')))
OR (F.EMAIL NOT LIKE '%@%.%')
OR (((select TAXID from CRMUSER.corporate where corp_key=a.cif_id) is null) and cif_id not like 'R%')
OR (d.cust_commu_code is null) and (A.cif_id NOT LIKE ('C%')))
AND A.CIF_ID=B.ORGKEY
AND A.SCHM_CODE=E.SCHM_CODE
AND A.SOL_ID=G.SOL_ID
AND A.SOL_ID=C.SOL_ID
AND A.CIF_ID=D.ORGKEY
AND A.CIF_ID=F.ORGKEY
AND A.ACCT_OWNERSHIP !='O'
AND A.SCHM_CODE NOT IN ('10009','10010','40001','10015')
AND B.PHONEOREMAIL='PHONE'
AND F.PHONEOREMAIL='EMAIL'
AND A.SOL_ID NOT IN ('999','900')
AND A.SCHM_TYPE IN ('SBA','ODA')
and foracid not like 'ZZ%'
and acct_opn_date >= '${startDate}'
AND A.ACCT_CLS_FLG='N'
AND A.DEL_FLG='N'
AND G.set_desc = '${zone}'
`;
}

export const getDQIReportByBranchQuery = (startDate, branch) => {
  return `SELECT A.CIF_ID,A.FORACID,A.ACCT_NAME,A.SCHM_CODE, E.SCHM_DESC,A.ACCT_OPN_DATE,C.SOL_ID, C.SOL_DESC, G.set_desc ZONE,B.PHONENO,CUSTOM.GETBVN(FORACID) BVN, F.EMAIL,
  (SELECT REF_DESC FROM TBAADM.RCT WHERE REF_CODE=D.OCCUPATION) OCCUPATION,(select substr(localetext,16,length(localetext)-16) from crmuser.category_lang g, crmuser.categories s
  where g.categoryid=s.categoryid and d.cust_commu_code=value and categorytype='COMMUNITY_CODE') RELIGION,(select TAXID from CRMUSER.corporate where corp_key=a.cif_id) TIN,
  decode(channel_id,'ONWEB','ONLINE WEB','WAL','WALLET','AGBK','AGENT BANKING',null,'INBRANCH','ALAT','ALAT')CHANNEL
  FROM TBAADM.GAM A, CRMUSER.PHONEEMAIL B, TBAADM.SOL C, CRMUSER.ACCOUNTS D,TBAADM.GSP E, CRMUSER.PHONEEMAIL F,(select sol_id,set_desc from tbaadm.stid a,
  tbaadm.sst b where a.set_id=b.set_id and a.set_id like 'Z%') G
  WHERE (((length(B.phonenocitycode)=3) and (LENGTH(B.phonenocountrycode||B.phonenocitycode||B.phonenolocalcode) < 13 OR B.PHONENO IS null))
  OR (A.SCHM_CODE NOT IN ('64001','64002') AND(custom.getbvn(foracid) is null or custom.getbvn(foracid) ='null' OR length(custom.getbvn(foracid)) < 11))
  OR ((A.SCHM_CODE NOT IN '60002') and (A.cif_id NOT LIKE ('C%') and (D.OCCUPATION is null or D.OCCUPATION='null')))
  OR (F.EMAIL NOT LIKE '%@%.%')
  OR (((select TAXID from CRMUSER.corporate where corp_key=a.cif_id) is null) and cif_id not like 'R%')
  OR (d.cust_commu_code is null) and (A.cif_id NOT LIKE ('C%')))
  AND A.CIF_ID=B.ORGKEY
  AND A.SCHM_CODE=E.SCHM_CODE
  AND A.SOL_ID=G.SOL_ID
  AND A.SOL_ID=C.SOL_ID
  AND A.CIF_ID=D.ORGKEY
  AND A.CIF_ID=F.ORGKEY
  AND A.ACCT_OWNERSHIP !='O'
  AND A.SCHM_CODE NOT IN ('10009','10010','40001','10015')
  AND B.PHONEOREMAIL='PHONE'
  AND F.PHONEOREMAIL='EMAIL'
  AND A.SOL_ID NOT IN ('999','900')
  AND A.SCHM_TYPE IN ('SBA','ODA')
  and foracid not like 'ZZ%'
  and acct_opn_date >= '${startDate}'
  AND A.ACCT_CLS_FLG='N'
  AND A.DEL_FLG='N'
  and A.sol_id='${branch}'
  `
}

export const getZoneQuery = () => {
  return `select sol_id,set_desc from tbaadm.stid a,
  tbaadm.sst b where a.set_id=b.set_id and a.set_id like 'Z%'`;
};
