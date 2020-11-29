import * as _ from 'lodash';
import { ErrorHandler } from '../../../../../util/errorHandler';
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { get_auditTransactionInformationReport } from './service';

export const get_auditTransactionInformationReportRouter = (req, res, jwt) => {
      isAuthenticated(req, jwt)
      .then((decoded_token: any) => {
          const page = _.get(req.query, "page", 1);
          const per_page = _.get(req.query, "per_page", 100);
          const { accessLevels } = decoded_token;

          get_auditTransactionInformationReport(
              accessLevels,
              page,
              per_page
            )
            .then(report => {
              return res.status(200).json(report);
            })
            .catch(error => {
              const err = ErrorHandler(req,  decoded_token.data.sAMAccountName, "get_auditTransactionInformationReport", 'Something went wrong while retrieving Audit information', error, false);      
              return res.status(400).json(err);
            });
        })
        .catch(err => {
          const handleErr = ErrorHandler(req,  '', "get_auditTransactionInformationReport", 'Session Expired. Logout and Login again.', err, false);      
          return res.status(401).json(handleErr);
        });
    };
