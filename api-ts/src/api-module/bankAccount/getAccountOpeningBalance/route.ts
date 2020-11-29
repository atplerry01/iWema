
import * as _ from 'lodash';
import { ErrorHandler } from '../../../util/errorHandler';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getAccountOpeningBalance } from './service';

export const getAccountOpeningBalanceRouter = (req, res, jwt: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {

        // console.log('scopeLevel:', decoded_token.scopeLevel);
        // console.log('allAccess:', decoded_token.accessLevels);

        const accno = _.get(req.query, 'accno');
        const datefrom = _.get(req.query, 'datefrom');

        getAccountOpeningBalance(accno, datefrom).then((result) => {
            return res.status(200).json(result);
        }).catch(error => {

                const err = ErrorHandler(req, decoded_token.data.sAMAccountName, "getAccountOpeningBalance", 'Account balance retrieval failed.', error, false);      
                return res.status(400).json(err);
        });

    }).catch(err => {
        const handleErr = ErrorHandler(req,  '', "getAccountOpeningBalance", 'Session Expired. Logout and Login again.', err, false);      
        return res.status(401).json(handleErr);
    });

};
