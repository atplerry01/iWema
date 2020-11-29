
import * as _ from 'lodash';
import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getEmployeeByStaffNo } from './service';

export const getEmployeeByStaffNoRouter = (req, res, jwt: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {
        const staffNo = _.get(req, 'params.staffNo');

        //  console.log('decoded_token:', decoded_token);

        getEmployeeByStaffNo(staffNo).then((user) => {
            return res.status(200).json(user);
        }).catch(err => {

            logMessage(req, decoded_token.data.sAMAccountName,
                'getEmployeeByStaffNo', staffNo, JSON.stringify(err));

            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};
