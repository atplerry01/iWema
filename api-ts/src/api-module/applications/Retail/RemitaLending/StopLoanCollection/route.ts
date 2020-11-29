import * as _ from "lodash";
import { postStopLoanCollectionService } from "../../../../../httpService/htttpClient_RemittaLending";
import { ErrorHandler } from "../../../../../util/errorHandler";
import { getLoanId } from "../GetLoans/service";
import { checkerPermission } from "../Shared/CheckerPermission";
import { isAuthenticated } from "./../../../../../util/isAuthenticated";
import { StopRemitaLendingLoan } from "./service";

export const StopLoanCollection = (req, res, jwt) => {
  isAuthenticated(req, jwt).then(async (decoded_token: any) => {
      const id = _.get(req.body, "id");

      if (!id) {
        const err = ErrorHandler(req,  decoded_token.data.sAMAccountName, "StopLoanCollection", 'No record found.', 'Invalid Parameters', true);      
        return res.status(400).json(err);
      }

      const {mail, sAMAccountName} = decoded_token.data;
      const { accessLevels } = decoded_token;

     await checkerPermission(req, res, sAMAccountName, accessLevels);

 
      try {

        const loan = await getLoanId(id);
        if (!loan) {
          const no_err = ErrorHandler(req, sAMAccountName, "StopLoanCollection", 'No record found.', null, true);      
          return res.status(404).json(no_err);
        }

        const param = {authCode: loan.authCode, customerId: loan.customerId, mandateReference: loan.mandateReference };

      const result = await postStopLoanCollectionService(param);
      if (result.Status === '00') {
       await StopRemitaLendingLoan( id, mail); 
        return res.status(200).json({  result: result.Msg });
      }

      const err = ErrorHandler(req, sAMAccountName, "StopLoanCollection", result.Msg, result, true);      
      return res.status(400).json(err);

    } catch (error) {

      const err = ErrorHandler(req, sAMAccountName, "StopLoanCollection", 'Stop loan collection failed', error, true);      
      return res.status(400).json(err);
        
    }



    })
    .catch(err => {
      console.log('err: ', err);
      const handleErr = ErrorHandler(req,  '', "StopLoanCollection", 'Session Expired. Logout and Login again.', err, true);      
      return res.status(400).json(handleErr);
    });
};
