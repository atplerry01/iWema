import * as _ from 'lodash';

import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getFixedDeposit } from './service';

 export const getFixedDepositRouter = (req, res, jwt: any, redis: any) => {

        isAuthenticated(req, jwt).then((decoded_token: any) => {

            const startDate = _.get(req.query, 'startDate');
            const endDate = _.get(req.query, 'endDate');
            const accountNo = _.get(req.query, 'accountNo');
            const branchCode = _.get(req.query, 'branchCode');
            const page = _.get(req.query, 'page', 1);
            const per_page = _.get(req.query, 'per_page', 50);
            const _export = _.get(req.query, 'export', 0);

            const {accessLevels, scopeLevel } = decoded_token;

            getFixedDeposit(startDate, endDate, accountNo, branchCode, accessLevels, scopeLevel, redis, page, per_page, _export).then((report) => {
                return res.status(200).json(report);
            }).catch(err => {
                logMessage(req, decoded_token.data.sAMAccountName, 'getFixedDeposit', JSON.stringify(req.query), JSON.stringify(err));

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
