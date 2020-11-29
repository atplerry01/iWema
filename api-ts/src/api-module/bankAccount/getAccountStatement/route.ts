
import * as _ from 'lodash';
import { ErrorHandler } from '../../../util/errorHandler';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { checkAccess, logMessage } from '../../../util/utility';
import { getAccountStatement } from './service';

export const getAccountStatementRouter = (req, res, jwt: any) => {

    isAuthenticated(req, jwt).then(async (decoded_token: any) => {

        const accno = _.get(req.query, 'accno');
        const datefrom = _.get(req.query, 'datefrom');
        const dateto = _.get(req.query, 'dateto');
        const adddetail = _.get(req.query, 'adddetail', 0);
        const myaccount = _.get(req.query, 'myaccount', '0');

        const { accessLevels } = decoded_token;

        if (myaccount === '0') { // skip authorization check for my account statement. my account statement would always come with value 1          

        try {
             await checkAccess("Bank Account Statement", accessLevels);
          } catch (error) {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "getBankAccountStatement",
              JSON.stringify(req.body),

              JSON.stringify(error)
            );
            return res.status(401).json({ err: null, message: "Access Denied. Unauthorized User" });
          }
        }

        getAccountStatement(accno, datefrom, dateto, adddetail).then((result) => {
            logMessage(req, decoded_token.data.sAMAccountName,'getBankAccountStatement', JSON.stringify(req.query), 'N/A');
            return res.status(200).json(result);           
        }).catch(error => {
            const err = ErrorHandler(req, decoded_token.data.sAMAccountName, "getBankAccountStatement", 'Account statement retrieval failed.', error, false);      
            return res.status(400).json(err);
        });

    }).catch(err => {
        const handleErr = ErrorHandler(req,  '', "getBankAccountStatement", 'Session Expired. Logout and Login again.', err, false);      
        return res.status(401).json(handleErr);
    });

};
