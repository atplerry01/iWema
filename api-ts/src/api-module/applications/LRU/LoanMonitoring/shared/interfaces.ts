export interface IFinacleLoans {
  ACCT_CLS_FLG: string;
  CIF_ID: string;
  INTEREST_DUE: number;
  LOAN_ACCOUNT_NO: string;
  LOAN_ACCT_BAL: number;
  LOAN_ACCT_NAME: string;
  LOAN_AMOUNT: number;
  OPER_ACCT_BAL: number;
  OPER_ACCT_BRN_ID: string;
  OPER_ACCT_BRN_NAME: string;
  OPER_ACCT_LIEN_AMT: number;
  OPER_ACCT_NAME: string;
  OPER_ACCT_NO: string;
  PRINCIPAL_DUE: number;
  SCHM_CODE: string;
  START_DATE: Date;
}

export interface ICases {
  Id: string;
  LoanAccountNumber: string;
  BranchCode: string;
  Zone: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICollector {
    Id: string;
    CaseId: string;
    Case: {
        LoanAccountNumber
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

  ACCT_CLS_FLG: string;
  CIF_ID: string;
  INTEREST_DUE: number;
  LOAN_ACCOUNT_NO: string;
  LOAN_ACCT_BAL: number;
  LOAN_ACCT_NAME: string;
  LOAN_AMOUNT: number;
  OPER_ACCT_BAL: number;
  OPER_ACCT_BRN_ID: string;
  OPER_ACCT_BRN_NAME: string;
  OPER_ACCT_LIEN_AMT: number;
  OPER_ACCT_NAME: string;
  OPER_ACCT_NO: string;
  PRINCIPAL_DUE: number;
  SCHM_CODE: string;
  START_DATE: Date;
}


export interface IFullCases2 {
    Id: string;
    CaseId: string;
  
    ACCT_CLS_FLG: string;
    CIF_ID: string;
    INTEREST_DUE: number;
    LOAN_ACCOUNT_NO: string;
    LOAN_ACCT_BAL: number;
    LOAN_ACCT_NAME: string;
    LOAN_AMOUNT: number;
    OPER_ACCT_BAL: number;
    OPER_ACCT_BRN_ID: string;
    OPER_ACCT_BRN_NAME: string;
    OPER_ACCT_LIEN_AMT: number;
    OPER_ACCT_NAME: string;
    OPER_ACCT_NO: string;
    PRINCIPAL_DUE: number;
    SCHM_CODE: string;
    START_DATE: Date;
  }
  