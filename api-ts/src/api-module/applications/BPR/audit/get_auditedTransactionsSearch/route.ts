import * as _ from 'lodash';
import { ErrorHandler } from '../../../../../util/errorHandler';
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { get_auditedTransactionsSearch } from './service';

export const get_auditedTransactionsSearchRouter = (req, res, jwt) => {
    isAuthenticated(req, jwt)
      .then((decoded_token: any) => {
        const transactionType = _.get(req.query, "transactionType");
        const AccountNo = _.get(req.query, "AccountNo");
        const startdate = _.get(req.query, "startdate");
        const enddate = _.get(req.query, "enddate");

        const allAccess = decoded_token.accessLevels;

        get_auditedTransactionsSearch(
            transactionType,
            AccountNo,
            startdate,
            enddate,
            allAccess
          )
          .then(report => {
            return res.status(200).json(report);
          })
          .catch(error => {
            const err = ErrorHandler(req,  decoded_token.data.sAMAccountName, "get_auditedTransactionsSearch", 'Something went wrong while searching', error, false);      
            return res.status(400).json(err);

          });
      })
      .catch(err => {
        const handleErr = ErrorHandler(req,  '', "get_auditedTransactionsSearch", 'Session Expired. Logout and Login again.', err, false);      
      return res.status(401).json(handleErr);
      });
  };
