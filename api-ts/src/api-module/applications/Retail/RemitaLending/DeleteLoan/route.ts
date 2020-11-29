import * as _ from "lodash";
import { ErrorHandler } from "../../../../../util/errorHandler";
import { sendEmail } from "../../../../../util/sendEmail";
import { logMessage } from "../../../../../util/utility";
import { getLoanId } from "../GetLoans/service";
import { checkerPermission } from "../Shared/CheckerPermission";
import { isAuthenticated } from "./../../../../../util/isAuthenticated";
import { deleteLoan } from "./service";

export const DeletLoanRoute = (req, res, jwt) => {
  isAuthenticated(req, jwt).then(async (decoded_token: any) => {
      const id: string = _.get(req.body, "id");
      const comment = _.get(req.body, "comment");
      
      if (!id || !comment) {
        const err = ErrorHandler(req,  decoded_token.data.sAMAccountName, "DeletLoan", 'Invalid Parameters', 'Invalid Parameters', true);      
        return res.status(400).json(err);
      }

      const {mail, sAMAccountName} = decoded_token.data;
      const { accessLevels } = decoded_token;

     await checkerPermission(req, res, sAMAccountName, accessLevels);
 
      try {
     
      const loan = await getLoanId(id);
      if (!loan) {
        const er = ErrorHandler(req, sAMAccountName, "DeletLoan", 'Failed to delete loan', 'Failed to delete loan', true);      
        return res.status(400).json(er);
      }
      const count = await deleteLoan(loan.id);

      if (count > 0) {

        logMessage(req, decoded_token.data.sAMAccountName, 'DeletLoan', JSON.stringify(req.bod), 'N/A');

        sendEmail(mail, loan.makerId, 'Remita Lending Loan Rejected/Deleted', 
        'Remita Lending Loan Rejected/Deleted for ' + loan.customerName, 
        `Deleted Remita Lending Loan for ${loan.customerName} -> ${loan.accountNumber}`, 
         comment,  decoded_token.data.displayName); 
         
        return res.status(200).json({  result: 'Loan Rejected' });
      }

      const err = ErrorHandler(req, sAMAccountName, "DeletLoan", 'Failed to delete loan', 'Failed to delete loan', true);      
      return res.status(400).json(err);

    } catch (error) {

      const err = ErrorHandler(req, sAMAccountName, "DeletLoan", 'Failed to delete loan', error, true);      
      return res.status(400).json(err);
        
    }


    })
    .catch(err => {
      const handleErr = ErrorHandler(req,  '', "DeletLoan", 'Session Expired. Logout and Login again.', err, true);      
      return res.status(401).json(handleErr);
    });
};

