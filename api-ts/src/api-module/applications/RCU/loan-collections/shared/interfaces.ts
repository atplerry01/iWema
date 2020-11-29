export interface IFinacleLoans {
  CIF_ID: string;
  FORACID: string;
  ACCT_NAME: string;
  SOL_ID: string;
  SOL_DESC: string;
  ZONE_DESC: string;
  MANAGER_NAME: string;
  INDUSTRY_DESC: string;
  SCHEME_DESC: string;
  SANCT_LIM: string;
  APPROV_DATE: string;
  TENOR_MONTHS: string;
  EXPIRY_DATE: string;
  INTEREST_RATE: string;
  NEXT_DMD_DATE: string;
  REPAYMNT_AMOUNT: string;
  REPAYMNT_ACCT: string;
  REPAY_ACCT_BAL: string;
  PAST_DUE_DATE: string;
  PRI_PAST_DUE: string;
  INT_PAST_DUE: string;
  PENAL_PAST_DUE: string;
  DAYS_PAST_DUE: string;
  LAST_CR_AMT: string;
  CREDIT_TRAN_DATE: string;
}

export interface ICases {
  Id: string;
  LoanAccountNumber: string;
  BranchCode: string;
  IsAssigned: Boolean;
  IsClosed: Boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICollector {
  Id: string;
  CaseId: string;
  Case: {
    LoanAccountNumber,
    AccountName,
  };
  AgentId: string;
  StageId: number;
  MarkEscalated: Boolean;
  MarkClosed: Boolean;
  createdAt: Date;
  updatedAt: Date;
}



export interface IClosedCase {
  Id: string;
  CaseId: string;
  Case: {
    LoanAccountNumber
  };
  StageId: number;
  LoanAccountBalance: number;
  AgentManagerId: string;
}

export interface IFullCases {
  Id: string;
  LoanAccountNumber: string;
  BranchCode: string;
  IsAssigned: Boolean;
  IsClosed: Boolean;
  createdAt: Date;
  updatedAt: Date;

  CIF_ID: string;
  FORACID: string;
  ACCT_NAME: string;
  SOL_ID: string;
  SOL_DESC: string;
  ZONE_DESC: string;
  MANAGER_NAME: string;
  INDUSTRY_DESC: string;
  SCHEME_DESC: string;
  SANCT_LIM: string;
  APPROV_DATE: string;
  TENOR_MONTHS: string;
  EXPIRY_DATE: string;
  INTEREST_RATE: string;
  NEXT_DMD_DATE: string;
  REPAYMNT_AMOUNT: string;
  REPAYMNT_ACCT: string;
  REPAY_ACCT_BAL: string;
  PAST_DUE_DATE: string;
  PRI_PAST_DUE: string;
  INT_PAST_DUE: string;
  PENAL_PAST_DUE: string;
  DAYS_PAST_DUE: string;
  LAST_CR_AMT: string;
  CREDIT_TRAN_DATE: string;
  // ACCT_CLS_FLG: string;
  // CIF_ID: string;
  // INTEREST_DUE: number;
  // LOAN_ACCOUNT_NO: string;
  // LOAN_ACCT_BAL: number;
  // LOAN_ACCT_NAME: string;
  // LOAN_AMOUNT: number;
  // OPER_ACCT_BAL: number;
  // OPER_ACCT_BRN_ID: string;
  // OPER_ACCT_BRN_NAME: string;
  // OPER_ACCT_LIEN_AMT: number;
  // OPER_ACCT_NAME: string;
  // OPER_ACCT_NO: string;
  // PRINCIPAL_DUE: number;
  // SCHM_CODE: string;
  // START_DATE: Date;
}

export interface IFullCases2 {
  Id: string;
  CaseId: string;

  CIF_ID: string;
  FORACID: string;
  ACCT_NAME: string;
  SOL_ID: string;
  SOL_DESC: string;
  ZONE_DESC: string;
  MANAGER_NAME: string;
  INDUSTRY_DESC: string;
  SCHEME_DESC: string;
  SANCT_LIM: string;
  APPROV_DATE: string;
  TENOR_MONTHS: string;
  EXPIRY_DATE: string;
  INTEREST_RATE: string;
  NEXT_DMD_DATE: string;
  REPAYMNT_AMOUNT: string;
  REPAYMNT_ACCT: string;
  REPAY_ACCT_BAL: string;
  PAST_DUE_DATE: string;
  PRI_PAST_DUE: string;
  INT_PAST_DUE: string;
  PENAL_PAST_DUE: string;
  DAYS_PAST_DUE: string;
  LAST_CR_AMT: string;
  CREDIT_TRAN_DATE: string;
}



export interface IAgent {
  Id: string;
  Email: string;
  Name: string;
  AgentCategoryId: number;
  AgentManagerId: string;
  Zone: string;
  ActiveCount: number;
  IsAvailable: number;
  createdAt: Date;
  updatedAt: Date;
}