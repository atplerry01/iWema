import * as _ from 'lodash';

import { logMessage } from '../../../../util/utility';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { getAccountProfitability } from './service';

export const getAccountProfitabilityRouter = (req, res, jwt: any, redis: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {

         // console.log('decoded_token:', decoded_token);

        const searchterm = _.get(req.query, 'searchterm');
        const type = _.get(req.query, 'type');
        const value = _.get(req.query, 'value');
        const monthFrom = Number(_.get(req.query, 'monthfrom'));
        const monthTo = Number(_.get(req.query, 'monthto'));

        const {accessLevels, scopeLevel} = decoded_token;

        const currentUser = decoded_token.data.sAMAccountName;
        const staffId = 'S' +  decoded_token.data.company;

        getAccountProfitability(staffId, searchterm, type, value, monthFrom, monthTo, accessLevels, scopeLevel, redis).then((report) => {
            return res.status(200).json(report);
        }).catch(err => {

            logMessage(req, currentUser, 'getAccountProfitability', JSON.stringify(req.query), JSON.stringify(err));

            return res.status(400).json({
                error: err
            });
        });

    }).catch(err => {
        return res.status(401).json({
            error: err
        });
    });

};
