
import * as _ from 'lodash';
import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getCustomerLoan } from './service';

export const getCustomerLoanRouter = (req, res, jwt: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {

        const accno = _.get(req.params, 'accno');

        getCustomerLoan(accno).then((result) => {
            return res.status(200).json(result);
        }).catch(err => {

            logMessage(req, decoded_token.data.sAMAccountName, 'getCustomerLoan',
                accno, JSON.stringify(err));

            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};
