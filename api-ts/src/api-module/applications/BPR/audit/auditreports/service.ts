import { AuditReport } from "../../../../../entity/AuditReport";

export const auditReport = async (
    ProcessTypeId: any,
    TransactionDate: string,
    AccountNumber: string,
    TransactionId: string,
    AccountInfo: string
  ) => {
    await AuditReport.create({
      process_id: ProcessTypeId,
      transaction_date: TransactionDate,
      account_number: AccountNumber,
      transaction_id: TransactionId,
      account_info: AccountInfo
    }).save();

  };

