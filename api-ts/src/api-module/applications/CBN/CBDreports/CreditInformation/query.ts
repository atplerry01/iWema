// MandateByBranchWith
// MandateByProduct
//startDate: any
export const getCreditInformationQuery = (startDate: any) => {
  // tslint:disable-next-line: max-line-length
  return `  select a.cif_id "Customer Id", 
  a.foracid "Account Number",
  case a.Acct_Cls_Flg when 'Y' THEN '002' ELSE '001' end "Account Status" ,
  nvl(to_Char(a.acct_cls_date,'dd/MM/YYYY'),to_Char(a.Rcre_Time,'dd/MM/YYYY')) "Account Status Date",
  to_Char(a.acct_opn_date,'dd/MM/YYYY') "Date Of Loan",
  abs(a.Sanct_Lim) "Credit Limit",
  abs(b.Dis_amt) "Loan Amount",
  abs(a.Clr_bal_amt) "Outstanding Balance",
  to_char((Select nvl(flow_amt,'0.00') from tbaadm.lrs x where x.acid = a.acid and rownum=1)) "Instalment amount",
  a.Acct_crncy_code "Currency",
  c.dpd "Days In Arrears",
  (select abs (Sum(d.tot_adj_amt) - Sum(d.dmd_amt)) from tbaadm.ldt d where d.acid = a.acid) "Overdue amount",
  (select cdt_mapping from custom.crcloans where trim(schm_desc) = trim(c.Fac_Type) and Rownum = 1) "Loan Type",
  to_char(b.Ei_perd_end_date  - a.acct_opn_date) "Loan Tenor",
  (select case Lr_freq_type WHEN 'W' THEN 'WEEKLY' WHEN 'H' THEN 'HALF YEARLY' WHEN  'M' THEN 'MONTHLY' WHEN 'Q' THEN 'QUATERLY' WHEN 'Y' THEN 'YEARLY' WHEN 'F' THEN 'FORTHNIGHTLY' END from Tbaadm.lrs where acid = a.acid and rownum=1) "Repayment Frequency",
  to_Char(c.Last_Any_Tran_Date,'dd/MM/YYYY') "Last Payment Date",
  abs(c.Last_Transaction_Amount) "Last Payment Amount",
  to_Char(b.Ei_perd_end_date,'dd/MM/YYYY')"Maturity Date",
  c.Classification "Loan Classification",
  'NO' "Legal Challenge Status",
  'N/A' "Litigation Date",
  'YES' "Consent Status",
  'YES' "Loan Security Status",
  case e.secu_type_ind WHEN 'A' THEN 'WMS MUTUAL FUNDS' 
    WHEN 'B' THEN 'BOOK DEBTS'
    WHEN 'C' THEN 'CHEQUES AND RECEIVABLES'
    WHEN 'D' THEN 'DEPOSITS'
    WHEN 'G' THEN 'GOVERNMENT SECURITIES'
    WHEN 'H' THEN 'WMS EQUITIES'
    WHEN 'I' THEN 'IMMOVABLE PROPERTY'
    WHEN 'J' THEN 'GOLD AND JEWELRY'
    WHEN 'L' THEN 'LIVESTOCK'
    WHEN 'M' THEN 'MACHINERY'
    WHEN 'N' THEN 'SMALL SAVINGS CERTIFICATE'
    WHEN 'O' THEN 'OTHERS'
    WHEN 'P' THEN 'LIFE INSURANCE'
    WHEN 'Q' THEN 'QIS STATEMENT'
    WHEN 'R' THEN 'GUARANTEE'
    WHEN 'S' THEN 'TRADABLE SECURITIES'
    WHEN 'T' THEN 'INVENTORY'
    WHEN 'U' THEN 'MUTUAL FUND UNITS'
    WHEN 'V' THEN 'VEHICLES'
    WHEN 'W' THEN 'WMS STRUCTURED PRODUCTS'
    WHEN 'X' THEN 'TRANSACTION  ACCOUNTS'
    ELSE 'OTHER' END "Collateral Type",
  nvl((Select q.ref_desc from Tbaadm.rct q where q.ref_code = e.secu_code), 'N/A') "Collateral Details",
  '    ' "Previous Account Number",
  '    ' "Previous Name",
  '    ' "Previous Customer Id",
  '    ' "Previous Branch Code"
  from  (select ACID,FORACID,OPERATIVE_ACCT,ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,LOAN_AMT,BALANCE,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
  from custom.provision_special_i where curr_class_date = '${startDate}' AND BALANCE < 0
  union all
  select ACID,FORACID,OPERATIVE_ACCT,ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,LOAN_AMT,BALANCE,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
  from custom.provision_details_i where curr_class_date = '${startDate}' AND BALANCE < 0) c, tbaadm.gam a, tbaadm.lam b, Tbaadm.sdr e
  where c.acid = a.acid(+)
  and a.acid = b.acid(+)
  and b.acid = e.acid(+)
  
  union all
  
  select a.cif_id, 
  a.foracid,
  case a.Acct_Cls_Flg when 'Y' THEN '002' ELSE '001' end "Account Status" ,
  nvl(to_Char(a.acct_cls_date,'dd/MM/YYYY'),to_Char(a.Rcre_Time,'dd/MM/YYYY')) "Account Status Date",
  to_Char(a.acct_opn_date,'dd/MM/YYYY') "Date Of Loan",
  abs(c.Sanct_Lim) "Credit Limit",
  abs(c.Sanct_Lim) "Loan Amount",
  abs(c.Od_Amt) "Outstanding Balance",
  to_char((Select flow_amt from tbaadm.lrs x where x.acid = a.acid and rownum=1)) "Instalment amount",
  a.Acct_crncy_code "Currency",
  c.dpd "Days In Arrears",
  abs(c.OD_Amt) "Overdue amount",
  (select cdt_mapping from custom.crcloans where trim(schm_desc) = trim(c.Fac_Type) and Rownum = 1) "Loan Type",
  'N/A' "Loan Tenor",
  'N/A' "Repayment Frequency",
  to_Char(c.Last_Any_Tran_Date,'dd/MM/YYYY') "Last Payment Date",
  c.Last_Transaction_Amount "Last Payment Amount",
  'N/A' "Maturity Date",
  c.Classification "Loan Classification",
  'NO' "Legal Challenge Status",
  'N/A' "Litigation Date",
  'YES' "Consent Status",
  'NO' "Loan Security Status",
  'N/A' "Collateral Type",
  'N/A' "Collateral Details",
  '    ' "Previous Account Number",
  '    ' "Previous Name",
  '    ' "Previous Customer Id",
  '    ' "Previous Branch Code"
  from (select ACID,FORACID,FORACID "OPERATIVE_ACCT",ACCT_NAME,FAC_TYPE,CUST_TYPE,SOL_ID,SANCT_LIM,OD_AMT,OVERLIMIT,DPD,LAST_ANY_TRAN_DATE,LAST_TRANSACTION_AMOUNT,CURR_CLASS_DATE,CLASSIFICATION,PROVISION,SUSPEND_INT
  from custom.provision_overdraft_i  where curr_class_date = '${startDate}' AND OD_AMT < 0)
  c , tbaadm.gam a where c.acid=a.acid
  
  `;
};
