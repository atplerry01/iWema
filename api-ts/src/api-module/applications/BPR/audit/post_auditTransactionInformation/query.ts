import { mysqlSanitizeInput } from "../../../../../db/dbUtil";

export const post_auditTransactionInformation_QUERY = (        
    TransactionDate: string,
    AccountNumber: string,
    TransactionId: string,
    AccountType: string,
    CustomerType: string,
    TransactionAmount: string,
    AccountName: string,
    DepositMode: string,
    TransactionPlatform: string,
    BranchCode: string,
    TransactionBranchName: string,
    InitiatorId: string,
    InitiatorName: string,
    DateRequestWasInitiated: string,
    TimeRequestWasInitiated: string,
    AuthorizerId: string,
    AuthorizerName: string,
    DateRequestWasAuthorized: string,
    TimeRequestWasAuthorized: string,
    AccountDomicileCode: string,
    AccountDomicileBranchName: string,
    DepositSplitInstrumentUsed: string,
    DepositSplitInstrumentCompletedAccurately: string,
    DepositSplitEndorsedWithReleaseStamp: string,
    AutomatedReceiptSignedByCustomer: string,
    DepositSplitTimeStamped: string,
    TimeStampedTime: string,
    TimeStampedDate: string,
    ProcessTypeId: string,
    // DateAudited: string,
    AuditorComment: string
   // access_level_id: string,        
    ) => {
        TransactionDate = mysqlSanitizeInput(TransactionDate); 
        AccountNumber = mysqlSanitizeInput(AccountNumber); 
        TransactionId = mysqlSanitizeInput(TransactionId); 
        // access_level_id= mysqlSanitizeInput(access_level_id); 
        AccountType = mysqlSanitizeInput(AccountType); 
        CustomerType = mysqlSanitizeInput(CustomerType); 
        TransactionAmount = mysqlSanitizeInput(TransactionAmount); 
        AccountName = mysqlSanitizeInput(AccountName); 
        DepositMode = mysqlSanitizeInput(DepositMode); 
        TransactionPlatform = mysqlSanitizeInput(TransactionPlatform); 
        BranchCode = mysqlSanitizeInput(BranchCode); 
        TransactionBranchName = mysqlSanitizeInput(TransactionBranchName); 
        InitiatorId = mysqlSanitizeInput(InitiatorId); 
        InitiatorName = mysqlSanitizeInput(InitiatorName); 
        DateRequestWasInitiated = mysqlSanitizeInput(DateRequestWasInitiated); 
        TimeRequestWasInitiated = mysqlSanitizeInput(TimeRequestWasInitiated); 
        AuthorizerId = mysqlSanitizeInput(AuthorizerId); 
        AuthorizerName = mysqlSanitizeInput(AuthorizerName); 
        DateRequestWasAuthorized = mysqlSanitizeInput(DateRequestWasAuthorized); 
        TimeRequestWasAuthorized = mysqlSanitizeInput(TimeRequestWasAuthorized); 
        AccountDomicileCode = mysqlSanitizeInput(AccountDomicileCode); 
        AccountDomicileBranchName = mysqlSanitizeInput(AccountDomicileBranchName); 
        DepositSplitInstrumentUsed = mysqlSanitizeInput(DepositSplitInstrumentUsed); 
        DepositSplitInstrumentCompletedAccurately = mysqlSanitizeInput(DepositSplitInstrumentCompletedAccurately); 
        DepositSplitEndorsedWithReleaseStamp = mysqlSanitizeInput(DepositSplitEndorsedWithReleaseStamp); 
        AutomatedReceiptSignedByCustomer = mysqlSanitizeInput(AutomatedReceiptSignedByCustomer); 
        DepositSplitTimeStamped = mysqlSanitizeInput(DepositSplitTimeStamped); 
        TimeStampedTime = mysqlSanitizeInput(TimeStampedTime); 
        TimeStampedDate = mysqlSanitizeInput(TimeStampedDate); 
        ProcessTypeId = mysqlSanitizeInput(ProcessTypeId); 
        AuditorComment = mysqlSanitizeInput(AuditorComment); 

    
    // tslint:disable-next-line:max-line-length
    return `INSERT INTO auditTransactionInformation (Id,TransactionDate, AccountNumber,TransactionId,AccountType,CustomerType,TransactionAmount,AccountName,DepositMode,TransactionPlatform,BranchCode,TransactionBranchName,InitiatorId,InitiatorName,DateRequestWasInitiated,TimeRequestWasInitiated,AuthorizerId,AuthorizerName,DateRequestWasAuthorized,TimeRequestWasAuthorized,AccountDomicileCode,AccountDomicileBranchName,DepositSplitInstrumentUsed,DepositSplitInstrumentCompletedAccurately,DepositSplitEndorsedWithReleaseStamp,AutomatedReceiptSignedByCustomer,DepositSplitTimeStamped,TimeStampedTime,TimeStampedDate,ProcessTypeId,Comment) VALUES (NULL,${TransactionDate},${AccountNumber},${TransactionId},${AccountType},${CustomerType},${TransactionAmount},${AccountName},${DepositMode},${TransactionPlatform},${BranchCode},${TransactionBranchName},${InitiatorId},${InitiatorName},${DateRequestWasInitiated},${TimeRequestWasInitiated},${AuthorizerId},${AuthorizerName},${DateRequestWasAuthorized},${TimeRequestWasAuthorized},${AccountDomicileCode},${AccountDomicileBranchName},${DepositSplitInstrumentUsed},${DepositSplitInstrumentCompletedAccurately},${DepositSplitEndorsedWithReleaseStamp},${AutomatedReceiptSignedByCustomer},${DepositSplitTimeStamped},${TimeStampedTime},${TimeStampedDate},${ProcessTypeId},${AuditorComment});`;

};
