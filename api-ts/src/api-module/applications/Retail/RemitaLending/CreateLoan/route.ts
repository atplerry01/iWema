import * as _ from "lodash";
import { ErrorHandler } from "../../../../../util/errorHandler";
import { checkAccess, logMessage } from "../../../../../util/utility";
import { isAuthenticated } from "./../../../../../util/isAuthenticated";
import { CreateLoan } from "./service";

export const CreateLoanRoute = (req, res, jwt) => {
  isAuthenticated(req, jwt).then(async (decoded_token: any) => {
      const customerId = _.get(req.body, "customerId") as string;
      const customerName = _.get(req.body, "customerName") as string;
      const phoneNumber = _.get(req.body, "phoneNumber") as string;
      const accountNumber = _.get(req.body, "accountNumber") as string;
      const bankCode = _.get(req.body, "bankCode") as string;
      const authCode = _.get(req.body, "authCode") as string;
      const bvn = _.get(req.body, "bvn") as string;
      const loanAmount = _.get(req.body, "loanAmount") as number;
      const collectionAmount = _.get(req.body, "collectionAmount") as number;
      const intRate = _.get(req.body, "intRate") as number;
      const numberOfRepayments = _.get(req.body, "numberOfRepayments") as number;
      const dateOfCollection = _.get(req.body, "dateOfCollection") as string;
      const totalCollectionAmount = _.get(req.body, "totalCollectionAmount") as number;
         
      const setupBy = decoded_token.data.mail;
     // const branch = decoded_token.data.branch;

      const { accessLevels } = decoded_token;

      try {
        const level = await checkAccess("Create Remita Lending", accessLevels );

        if (level !== "M") {
          const handleErr = ErrorHandler(req, decoded_token.data.sAMAccountName, "RemitaLending_CreateLoan", 'Access Denied. Unauthorized User', null, true);
          return res.status(401).json(handleErr);
        }
      } catch (error) {
        const handleErr = ErrorHandler(req,  decoded_token.data.sAMAccountName, "RemitaLending_CreateLoan", 'Access Denied. Unauthorized User', error, true);
        return res.status(400).json(handleErr);
      }


      try {
        
      const result = await CreateLoan(
        customerId,
        customerName,
        phoneNumber,
        accountNumber,
        bankCode,
        authCode,
        bvn,
        loanAmount,
        collectionAmount,
        numberOfRepayments,
        dateOfCollection,
        totalCollectionAmount,
        setupBy,
        intRate
      );

      if (result) {
        logMessage(req, decoded_token.data.sAMAccountName, 'RemitaLending_CreateLoan', JSON.stringify(req.bod), 'SUCCESS');
        return res.status(200).json({result});
      }

      const err = ErrorHandler(req,  decoded_token.data.sAMAccountName, "RemitaLending_CreateLoan", 'Loan Creation Failed', null, true);      
      return res.status(400).json(err);

    } catch (error) {
      let msg = 'Loan Creation Failed';
      if (error.code === 'ER_DUP_ENTRY') {
        msg = 'Loan Creation Failed. Duplicate Record Detected';
      }
      const err = ErrorHandler(req,  decoded_token.data.sAMAccountName, "RemitaLending_CreateLoan", msg, error, true);      
      return res.status(400).json(err);
        
    }


    })
    .catch(err => {
      const handleErr = ErrorHandler(req,  '', "RemitaLending_CreateLoan", 'Session Expired. Logout and Login again.', err, true);      
      return res.status(401).json(handleErr);
    });
};
