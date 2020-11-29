import * as _ from 'lodash';

import { logMessage } from '../../../../util/utility';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { getRMDashboard } from './service';


export const getRMDashboardRouter = (req, res, jwt: any, redis: any) => {

       isAuthenticated(req, jwt).then((decoded_token: any) => {

            const userId = _.get(req.query, 'userId');
            const staffId = decoded_token.data.sAMAccountName;           
            const allAccess = decoded_token.accessLevels;

            getRMDashboard(staffId, userId, allAccess, redis).then((report) => {
                return res.status(200).json(report);
            }).catch(err => {
                logMessage(req, staffId, 'getRMDashboard', JSON.stringify(req.query), JSON.stringify(err));

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
