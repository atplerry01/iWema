import { ErrorHandler } from '../../../../../util/errorHandler';
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { get_auditProcessType } from './service';

export const get_auditProcessTypeRouter = (req, res, jwt) => {
    isAuthenticated(req, jwt)
      .then((decoded_token: any) => {
        const { accessLevels } = decoded_token;

        get_auditProcessType(accessLevels)
          .then(report => {
            return res.status(200).json(report);
          })
          .catch(error => {
            const err = ErrorHandler(req,  decoded_token.data.sAMAccountName, "get_auditProcessType", 'Something went wrong while retrieving Processing-Type', error, false);      
            return res.status(400).json(err);       
          });
      })
      .catch(err => {
        const handleErr = ErrorHandler(req,  '', "get_auditProcessType", 'Session Expired. Logout and Login again.', err, false);      
        return res.status(401).json(handleErr);
      });
  };
