import { executeMySQL } from "../../../../../db/dbUtil";
import { post_auditTransactionInformation_QUERY } from "./query";

export const post_auditTransactionInformation = (
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
    AuditCommented: string
    // accessLevels
  ) => {
    return new Promise(async (resolve, reject) => {
      if (!AuditCommented && !ProcessTypeId) {
        return reject({ err: "", message: "Fill all required fields" });
      }

      // try {
      //     const level = await this.utilities.checkAccess('App Admin', accessLevels);
      //     if (level !== 'G') {
      //         return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
      //     }
      // } catch (error) {
      //         return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
      // }

      try {
        // tslint:disable-next-line:max-line-length
        const q = post_auditTransactionInformation_QUERY(
          TransactionDate,
          AccountNumber,
          TransactionId,
          AccountType,
          CustomerType,
          TransactionAmount,
          AccountName,
          DepositMode,
          TransactionPlatform,
          BranchCode,
          TransactionBranchName,
          InitiatorId,
          InitiatorName,
          DateRequestWasInitiated,
          TimeRequestWasInitiated,
          AuthorizerId,
          AuthorizerName,
          DateRequestWasAuthorized,
          TimeRequestWasAuthorized,
          AccountDomicileCode,
          AccountDomicileBranchName,
          DepositSplitInstrumentUsed,
          DepositSplitInstrumentCompletedAccurately,
          DepositSplitEndorsedWithReleaseStamp,
          AutomatedReceiptSignedByCustomer,
          DepositSplitTimeStamped,
          TimeStampedTime,
          TimeStampedDate,
          ProcessTypeId,
          AuditCommented
        );

        const result = await executeMySQL(q) as any;

        const success = result.affectedRows === 1 ? true : false;
        // const idno = success ? result.insertId : null;

        return resolve({ success, message: "Audit Successful" });
      } catch (err) {
        return reject({
          err: err,
          message: "Could Not Complete Audit"
        });
      }
    });
  };
