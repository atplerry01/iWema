
import * as _ from 'lodash';
import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getEmployeesByRole } from './service';

export const getEmployeesByRoleRouter = (req, res, jwt: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {

        const roleid = _.get(req.params, 'roleid');
      
        getEmployeesByRole(roleid).then((user) => {
            return res.status(200).json(user);
        }).catch(err => {
            logMessage(req, decoded_token.data.sAMAccountName, 'getEmployeesByRole', JSON.stringify(req.query), JSON.stringify(err));
            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};
