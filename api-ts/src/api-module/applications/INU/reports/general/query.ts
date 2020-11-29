// MandateByBranchWith
// MandateByProduct

export const getGeneralInfoQuery = () => {
  // tslint:disable-next-line: max-line-length
  return `select acid,p.foracid, acct_name,acct_ownership,schm_code,schm_desc, acct_cls_flg,dis_amt,Outstanding_Bal,INTEREST_RATE,LAST_IDT_PURGE_DATE,NRML_ACCRUED_AMOUNT_DR, DateApprov, ExpiryDate,
  tenor,channel_id,RM_code ,RM_Name, Region, Zone from (select a.acid,foracid, acct_name,acct_ownership,a.schm_code,schm_desc, acct_cls_flg,dis_amt,clr_bal_amt Outstanding_Bal,INTEREST_RATE,LAST_IDT_PURGE_DATE,NRML_ACCRUED_AMOUNT_DR,EI_PERD_START_DATE DateApprov,EI_PERD_END_DATE ExpiryDate,
 (EI_PERD_END_DATE-EI_PERD_START_DATE)||' Days' tenor,channel_id
 from tbaadm.gam a, tbaadm.eit b,  tbaadm.lam c, tbaadm.gsp d
 where a.acid = b.entity_id and a.schm_code = d.schm_code
 and a.acid = c.acid) p
 
 left join
 (select foracid ,ACCT_MGR_USER_ID RM_code,EMP_NAME RM_Name
  from tbaadm.gam a, tbaadm.get b
  where a.ACCT_MGR_USER_ID = b.EMP_ID) n
  on n.foracid = p.foracid
  
  left join
  (  select foracid , case when a.sol_id in ('132','133','048','007','095','036','131','156','161','047','027','197','203','099','081','073','189','163') then 'IKEJA'
             when a.sol_id in ('128','127','092','121','079','076','191','029','066','042','202','194','205','207','209','130','056') then 'LAGOS ISLAND'
             when a.sol_id in ('211','035','062','059','074','210','125','162','072','070','032','022','008','093','084','069','105','075') then 'LAGOS MAINLAND'
             when a.sol_id in ('077','086','152','190','142','080','204','206','108','143','208','113','038') then 'NORTH BANK'
             when a.sol_id in ('097','115','119','172','094','168','145','118','150','146','085','198','054') then 'SOUTH SOUTH'
             when a.sol_id in ('006','139','023','050','103','167','140','179','016','195','026') then 'AKURE'
             when a.sol_id in ('089','141','174','055','015','123','061','180','181','196','199') then 'EKITI'
             when a.sol_id in ('002','057','068','192','082','064','017','018','060','039','031','176','043','037','040','166','135') then 'IBADAN'
             when a.sol_id in ('164','090','001','033','012','126','193','014','004','106','019','003','034','041','067','149') then 'OGUN'
             when a.sol_id in ('030','025','175','071','136','065','177','138','087') then 'OSOGBO'
             else 'Others' end Zone
 from tbaadm.sol a,tbaadm.gam b
 where a.sol_id = b.sol_id
       and b.foracid not like 'ZZ%') t
      on t.foracid = p.foracid
      
 left join
 (
     select foracid , case when a.sol_id in ('097','115','119','172','094','168','145','118','150','146','085','198','054') then 'South South'
             when a.sol_id in ('132','133','048','007','095','036','131','156','161','047','027','197','203','099','081','073','189','163','128','127','092','121','079','076','191','029','066','042','202','194','205','207','209','130','056','035','062','059','074','210','125',
                                 '162','072','070','032','022','008','093','084','069','105','075') then 'Lagos'
             when a.sol_id in ('006','139','023','050','103','167','140','179','016','195','026','089','141','174','055','015','123','061','180','181','196','199','002','057','068','192','082','064','017','018','060','039','031','176','043','037','040','166','135','164','090','001','033','012','126','193','014','004','106','019','003','034',
                                 '041','067','149','030','025','175','071','136','065','177','138','087') then 'South West'
             when a.sol_id in ('077','086','152','190','142','080','204','206','108','143','208','113','038') then 'North Bank'
             else 'Others' end Region
 from tbaadm.sol a,tbaadm.gam b
 where a.sol_id = b.sol_id
       and b.foracid not like 'ZZ%') r
       on r.foracid = p.foracid`;
}; //
