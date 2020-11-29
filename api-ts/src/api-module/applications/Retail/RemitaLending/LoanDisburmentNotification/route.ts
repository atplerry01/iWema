import * as _ from "lodash";
import * as moment from 'moment';
import { postLoanDisbursementNot } from "../../../../../httpService/htttpClient_RemittaLending";
import { ErrorHandler } from "../../../../../util/errorHandler";
import { getLoanId } from "../GetLoans/service";
import { checkerPermission } from "../Shared/CheckerPermission";
import { isAuthenticated } from "./../../../../../util/isAuthenticated";
import { UpdateRemitaLending } from "./service";

export const LoanDisburmentNotification = (req, res, jwt) => {
  isAuthenticated(req, jwt).then(async (decoded_token: any) => {

      const id = _.get(req.body, "id");        

      if (!id) {
        const err = ErrorHandler(req,  decoded_token.data.sAMAccountName, "LoanDisburmentNotification", 'No record found.', 'Invalid Parameters', true);      
        return res.status(400).json(err);
      }

      const {mail, sAMAccountName} = decoded_token.data;
      const { accessLevels } = decoded_token;

     await checkerPermission(req, res, sAMAccountName, accessLevels);    

      try {

        const loan = await getLoanId(id);
        if (!loan) {
          const no_err = ErrorHandler(req, sAMAccountName, "LoanDisburmentNotification", 'No record found.', null, true);      
          return res.status(404).json(no_err);
        }

        const param = {
          customerId: loan.customerId, 
          authCode: loan.authCode, 
          authChannel: 'USSD',
          phoneNumber: loan.phoneNumber, 
          accountNumber: loan.accountNumber, 
          Currency: 'NGN',
          loanAmount: loan.loanAmount, 
          collectionAmount: loan.collectionAmount, 
          dateOfDisbursement: moment(new Date()).format('DD-MM-YYYY') + ' 00:00:00',
          dateOfCollection: loan.dateOfCollection,
          totalCollectionAmount: loan.totalCollectionAmount, 
          numberOfRepayments: loan.numberOfRepayments           
        };

      let result = await postLoanDisbursementNot(param);

      if (result.Status === '00') {
        result = JSON.parse(result.Result); 
      
       await  UpdateRemitaLending(
          id,
          result.data.mandateReference,
          mail
      );
        return res.status(200).json({  success: true  });
      }

      const err = ErrorHandler(req, sAMAccountName, "LoanDisburmentNotification", result.Msg, result, true);      
      return res.status(400).json(err);

    } catch (error) {

      const err = ErrorHandler(req, sAMAccountName, "LoanDisburmentNotification", 'Loan Disbursement failed', error, true);      
      return res.status(400).json(err);        
    }


    })
    .catch(err => {
      console.log('err: ', err);
      const handleErr = ErrorHandler(req,  '', "LoanDisburmentNotification", 'Session Expired. Logout and Login again.', err, true);      
      return res.status(400).json(handleErr);
    });
};
