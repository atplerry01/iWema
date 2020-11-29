
import * as _ from 'lodash';
import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getCustomerTD } from './service';

export const getCustomerTDRouter = (req, res, jwt: any) => {

   isAuthenticated(req, jwt).then((decoded_token: any) => {

        const accno = _.get(req.params, 'accno');

        getCustomerTD(accno).then((result) => {
            return res.status(200).json(result);
        }).catch(err => {

            logMessage(req, decoded_token.data.sAMAccountName, 'getCustomerTD',
                accno, JSON.stringify(err));

            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};
