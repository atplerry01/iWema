import * as _ from "lodash";
import { ErrorHandler } from "../../../../../util/errorHandler";
import { isAuthenticated } from "./../../../../../util/isAuthenticated";
import { checkAccess } from "./../../../../../util/utility";
import { createStatementRendition, getProfiledAccounts } from "./service";

export const statementProfiling = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (decoded_token: any) => {
      const cifAccount = _.get(req.body, "CifAccount");
      const accountName = _.get(req.body, "AccountName");
      const primaryEmail = _.get(req.body, "PrimaryEmail");
      const docFormat = _.get(req.body, "DocFormat");
      const frequency = _.get(req.body, "Frequency");
      const ccEmail = _.get(req.body, "ccEmail");
      const bccEmail = _.get(req.body, "bccEmail");
      const accountList = _.get(req.body, "accountList");
      const month = _.get(req.body, "month");
      const day = _.get(req.body, "day");
      const weekday = _.get(req.body, "weekday");

      const setupBy = decoded_token.data.mail;
      const branch = decoded_token.data.branch;

      const { accessLevels } = decoded_token;

      try {
        const level = await checkAccess(
          "SR-Statement Profiling",
          accessLevels
        );

        if (level !== "M") {
          const handleErr = ErrorHandler(req, decoded_token.data.sAMAccountName, "post_statement-rendition", 'Access Denied. Unauthorized User', null, true);
          return res.status(401).json(handleErr);
        }
      } catch (error) {
        const handleErr = ErrorHandler(req,  decoded_token.data.sAMAccountName, "post_statement-rendition", 'Access Denied. Unauthorized User', error, true);
        return res.status(400).json(handleErr);
      }


 
      const profiledAccounts: any[] = await getProfiledAccounts(cifAccount, docFormat, frequency); 
    
      if (profiledAccounts.length) {
        const formattedAccs = profiledAccounts.map(x => x.accountNumber);
        
        const accountsprofiledAlready: string[] = [];
        
          accountList.forEach((accountNumber) => {
            if (formattedAccs.includes(accountNumber)) {
              accountsprofiledAlready.push(accountNumber);
              // Inner Arr
            }
          });

          if (accountsprofiledAlready.length) {
             const msg = accountsprofiledAlready.length === 1 ? 'This account had' : 'The following accounts have';
             const message = `${msg} been captured already (${accountsprofiledAlready.join(',')})`;
            

            const handleErr = ErrorHandler(req,  decoded_token.data.sAMAccountName, "post_statement-rendition", message, null, true);
            return res.status(400).json(handleErr);            
          }
      }
   
      try {
        
      const result = await createStatementRendition(
        cifAccount,
        accountName,
        primaryEmail,
        docFormat,
        frequency,
        ccEmail,
        bccEmail,
        setupBy,
        branch,
        month,
        day,
        weekday,
        accountList
      );

      if (result) {
        return res.status(200).json({
          logged: true
        });
      }

      const err = ErrorHandler(req,  decoded_token.data.sAMAccountName, "post_statement-rendition", 'Statement Rendition Creation Failed', null, true);      
      return res.status(400).json(err);

    } catch (error) {

      const err = ErrorHandler(req,  decoded_token.data.sAMAccountName, "post_statement-rendition", 'Statement Rendition Creation Failed', error, true);      
      return res.status(400).json(err);
        
    }



    })
    .catch(err => {
      const handleErr = ErrorHandler(req,  '', "post_statement-rendition", 'Session Expired. Logout and Login again.', err, true);      
      return res.status(400).json(handleErr);
    });
};
