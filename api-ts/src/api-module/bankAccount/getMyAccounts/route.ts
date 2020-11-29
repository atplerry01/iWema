
import * as _ from 'lodash';
import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getMyAccounts } from './service';

export const getMyAccountsRouter = (req, res, jwt) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {
        const accno = _.get(req.query, 'accno');
        const ownAccount = _.get(req.query, 'ownaccount');
        const username = decoded_token.data.sAMAccountName;

        getMyAccounts(accno, ownAccount).then((result) => {
           logMessage(req, username, 'getMyAccounts',
                accno, 'N/A');

            return res.status(200).json(result);
        }).catch(err => {
            logMessage(req, username, 'getMyAccounts', accno, JSON.stringify(err));
            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};
