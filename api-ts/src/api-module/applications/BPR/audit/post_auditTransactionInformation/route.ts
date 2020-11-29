import * as _ from 'lodash';
import { logMessage } from '../../../../../util/utility';
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { post_auditTransactionInformation } from './service';

export const post_auditTransactionInformationRouter = (req, res, jwt) => {
    isAuthenticated(req, jwt)
      .then((decoded_token: any) => {
        const TransactionDate = _.get(req.body, "TransactionDate");
        const AccountNumber = _.get(req.body, "AccountNumber");
        const TransactionId = _.get(req.body, "TransactionId");
        const AccountType = _.get(req.body, "AccountType");
        const CustomerType = _.get(req.body, "CustomerType");
        const TransactionAmount = _.get(req.body, "TransactionAmount");
        const AccountName = _.get(req.body, "AccountName");
        const DepositMode = _.get(req.body, "DepositMode");
        const TransactionPlatform = _.get(req.body, "TransactionPlatform");
        const BranchCode = _.get(req.body, "BranchCode");
        const TransactionBranchName = _.get(
          req.body,
          "TransactionBranchName"
        );
        const InitiatorId = _.get(req.body, "InitiatorId");
        const InitiatorName = _.get(req.body, "InitiatorName");
        const DateRequestWasInitiated = _.get(
          req.body,
          "DateRequestWasInitiated"
        );
        const TimeRequestWasInitiated = _.get(
          req.body,
          "TimeRequestWasInitiated"
        );
        const AuthorizerId = _.get(req.body, "AuthorizerId");
        const AuthorizerName = _.get(req.body, "AuthorizerName");
        const DateRequestWasAuthorized = _.get(
          req.body,
          "DateRequestWasAuthorized"
        );
        const TimeRequestWasAuthorized = _.get(
          req.body,
          "TimeRequestWasAuthorized"
        );
        const AccountDomicileCode = _.get(req.body, "AccountDomicileCode");
        const AccountDomicileBranchName = _.get(
          req.body,
          "AccountDomicileBranchName"
        );
        const DepositSplitInstrumentUsed = _.get(
          req.body,
          "DepositSplitInstrumentUsed"
        );
        const DepositSplitInstrumentCompletedAccurately = _.get(
          req.body,
          "DepositSplitInstrumentCompletedAccurately"
        );
        const DepositSplitEndorsedWithReleaseStamp = _.get(
          req.body,
          "DepositSplitEndorsedWithReleaseStamp"
        );
        const AutomatedReceiptSignedByCustomer = _.get(
          req.body,
          "AutomatedReceiptSignedByCustomer"
        );
        const DepositSplitTimeStamped = _.get(
          req.body,
          "DepositSplitTimeStamped"
        );
        const TimeStampedTime = _.get(req.body, "TimeStampedTime");
        const TimeStampedDate = _.get(req.body, "TimeStampedDate");
        const ProcessTypeId = _.get(req.body, "ProcessTypeId");
        //  const DateAudited = _.get(req.body, 'DateAudited');
        const AuditCommented = _.get(req.body, "AuditCommented");

        //  const accessLevels = decoded_token.accessLevels;
        post_auditTransactionInformation(
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
          )
          .then(report => {
            return res.status(201).json(report);
          })
          .catch(err => {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "post_auditTransactionInformation",
              JSON.stringify(req.body),
              JSON.stringify(err)
            );

            return res.status(400).json({
              error: err
            });
          });
      })
      .catch(err => {
        return res.status(401).json({
          error: err
        });
      });
  };
