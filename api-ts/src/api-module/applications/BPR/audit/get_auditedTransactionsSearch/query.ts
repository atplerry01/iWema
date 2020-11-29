import { mysqlSanitizeInput } from "../../../../../db/dbUtil";

export const get_auditedTransactionsSearch_QUERY = (transactionType, AccountNo, startdate, enddate) => {
    let q =  `SELECT  * FROM`;
    if (transactionType === "reactivatedaccounts") {
        q = ` ${q} reactivatedaccounts WHERE AccountNo = ${mysqlSanitizeInput(AccountNo)} and date(AcctOpnDate) between ${mysqlSanitizeInput(startdate)} and ${mysqlSanitizeInput(enddate)} `;
    } else if (transactionType === "closedaccounts") {
        q = ` ${q} closedaccounts WHERE AccountNo = ${mysqlSanitizeInput(AccountNo)} and date(AcctClsDate) between ${mysqlSanitizeInput(startdate)} and ${mysqlSanitizeInput(enddate)}`;
    } else if (transactionType === "newaccount") {
        q = ` ${q} new_account WHERE AccountNo = ${mysqlSanitizeInput(AccountNo)} and date(AcctOpnDate) between ${mysqlSanitizeInput(startdate)} and ${mysqlSanitizeInput(enddate)}`;
    } else if (transactionType === "cashdeposits") {
        q = ` ${q} cashdeposits WHERE AccountNo = ${mysqlSanitizeInput(AccountNo)} and date(TransactionDate) between ${mysqlSanitizeInput(startdate)} and ${mysqlSanitizeInput(enddate)}`;
    } else if (transactionType === "cashwithdrawals") {
        q = ` ${q} cashwithdrawals WHERE AccountNo = ${mysqlSanitizeInput(AccountNo)} and date(TransactionDate) between ${mysqlSanitizeInput(startdate)} and ${mysqlSanitizeInput(enddate)}`;
    } else if (transactionType === "transfertransactions") {
         q = ` ${q} transfertransactions WHERE AccountNo = ${mysqlSanitizeInput(AccountNo)} and date(TransactionDate) between ${mysqlSanitizeInput(startdate)} and ${mysqlSanitizeInput(enddate)}`;
    }        

    return ` ${q} ORDER BY AccountNo ASC `;
};
