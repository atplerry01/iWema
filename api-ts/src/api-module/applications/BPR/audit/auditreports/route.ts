import * as _ from 'lodash';
import { ErrorHandler } from '../../../../../util/errorHandler';
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { auditReport } from './service';

export const auditreportsRouter = (req, res, jwt) => {
        
    isAuthenticated(req, jwt)
    .then(async() => {
        const processTypeId = _.get(req.body, "processTypeId");
        const transactionDate = _.get(req.body, "transactionDate");
        const accountNumber = _.get(req.body, "accountNumber");
        const transactionId = _.get(req.body, "transactionId");
        const accountInfo = _.get(req.body, "accountInfo");

      //   console.log(req.body.query);
      //   console.log(processTypeId);

      //   if (!processTypeId || !accountInfo || !additionalInfo) {
      //     return res.status(401).json({
      //       logged: false
      //     });
      //   }

      await auditReport(
          processTypeId,
          transactionDate,
          accountNumber,
          transactionId,
          accountInfo
        );

        return res.status(200).json({
          logged: true
        });
      })
      .catch(err => {
        const handleErr = ErrorHandler(req,  '', "auditreports", 'Session Expired. Logout and Login again.', err, true);      
      return res.status(401).json(handleErr);
      });
  };
