import * as _ from 'lodash';

import { logMessage } from '../../../../util/utility';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { getTopDepositors } from './service';


export const getTopDepositorsRouter = (req, res, jwt: any, redis: any) => {

        isAuthenticated(req, jwt).then((decoded_token: any) => {

            const reportType = _.get(req.query, 'reportType');
            const _date = _.get(req.query, '_date');
            const branchCode = _.get(req.query, 'branchCode', '');
            const page = _.get(req.query, 'page', 1);
            const per_page = _.get(req.query, 'per_page', 100);
            const _export = _.get(req.query, 'export');

            const allAccess = decoded_token.accessLevels;
            const scopeLevel = decoded_token.scopeLevel;
            const staffId = 'S' +  decoded_token.data.company;

            getTopDepositors(staffId, reportType, branchCode, _date, allAccess, scopeLevel, redis, page, per_page, _export).then((report) => {
                return res.status(200).json(report);
            }).catch(err => {
               logMessage(req, decoded_token.data.sAMAccountName, 'getTopDepositors', JSON.stringify(req.query), JSON.stringify(err));

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

