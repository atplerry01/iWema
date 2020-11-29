
import * as _ from 'lodash';
import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getCustomerAccounts } from './service';

export const getCustomerAccountsRouter = (req, res, jwt) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {
        const accno = _.get(req.query, 'accno');
        const ownAccount = _.get(req.query, 'ownaccount');

        const {accessLevels, scopeLevel} = decoded_token;

        getCustomerAccounts(accno, ownAccount, accessLevels, scopeLevel).then((result) => {

          logMessage(req, decoded_token.data.sAMAccountName,
                'getCustomerAccounts', accno, 'N/A');

            return res.status(200).json(result);
        }).catch(err => {
           logMessage(req, decoded_token.data.sAMAccountName,
                'getCustomerAccounts', accno, JSON.stringify(err));
            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};
