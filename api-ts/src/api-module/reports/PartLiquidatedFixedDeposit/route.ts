import * as _ from 'lodash';

import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getPartLiquidatedFixedDeposit } from './service';

export const getPartLiquidatedFixedDepositRouter = (req, res, jwt: any, redis: any) => {

        isAuthenticated(req, jwt).then((decoded_token: any) => {

            const dateType = _.get(req.query, 'dateType');
            const startDate = _.get(req.query, 'startDate');
            const endDate = _.get(req.query, 'endDate');
            const accountNo = _.get(req.query, 'accountNo');
            const branchCode = _.get(req.query, 'branchCode');
            const status = _.get(req.query, 'status');
            const page = _.get(req.query, 'page', 1);
            const per_page = _.get(req.query, 'per_page', 50);
            const _export = _.get(req.query, 'export', 0);

            const {accessLevels, scopeLevel} = decoded_token;

            getPartLiquidatedFixedDeposit(dateType, startDate, endDate, accountNo, branchCode, status, accessLevels, scopeLevel, redis, page, per_page, _export).then((report) => {
                logMessage(req, decoded_token.data.sAMAccountName, 'getPartLiquidatedFixedDeposit', JSON.stringify(req.query), 'N/A');
                return res.status(200).json(report);
            }).catch(err => {
                logMessage(req, decoded_token.data.sAMAccountName, 'getPartLiquidatedFixedDeposit', JSON.stringify(req.query), JSON.stringify(err));

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
