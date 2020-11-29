
import * as _ from 'lodash';
import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getStaffAccouthWithStaffId } from './service';

export const getStaffAccouthWithStaffIdRouter = (req, res, jwt: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {
        const staffNo = _.get(req, 'params.staffNo');

        //  console.log('decoded_token:', decoded_token);

        getStaffAccouthWithStaffId(staffNo).then((account) => {
            return res.status(200).json(account);
        }).catch(err => {
            logMessage(req, decoded_token.data.sAMAccountName,
                'getStaffAccouthWithStaffId', staffNo, JSON.stringify(err));

            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};
