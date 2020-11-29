import * as _ from 'lodash';

import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getTopCustomers_TD_CASA } from './service';

 export const getTopCustomers_td_casaRouter = (req, res, jwt: any, redis: any) => {

            isAuthenticated(req, jwt).then((decoded_token: any) => {

                const reportType = _.get(req.query, 'reportType');
                const selectedDate = _.get(req.query, 'selectedDate');
                const branchCode = _.get(req.query, 'branchCode');

                const {accessLevels, scopeLevel} = decoded_token;

                getTopCustomers_TD_CASA(reportType, selectedDate, branchCode, accessLevels, scopeLevel, redis).then((report) => {
                   return res.status(200).json(report);
                }).catch(err => {
                    logMessage(req, decoded_token.data.sAMAccountName, 'getTopCustomers_td_casa', JSON.stringify(req.query), JSON.stringify(err));

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
