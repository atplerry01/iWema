
import * as _ from 'lodash';
import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getThisMonthCustomerBirthdayByCustomerID } from './service';

export const getThisMonthCustomerBirthdayByCustomerIDRouter = (req, res, jwt: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {
        const customerid = _.get(req, 'params.customerid');

        //  console.log('decoded_token:', decoded_token);

        getThisMonthCustomerBirthdayByCustomerID(customerid).then((dob) => {
            return res.status(200).json(dob);
        }).catch(err => {

            logMessage(req, decoded_token.data.sAMAccountName,
                'getThisMonthCustomerBirthdayByCustomerID', customerid, JSON.stringify(err));

            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};
