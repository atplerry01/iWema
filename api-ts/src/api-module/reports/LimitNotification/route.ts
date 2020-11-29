import * as _ from 'lodash';

import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getLimitNotification } from './service';

export const getLimitNotificationRouter = (req, res, jwt: any) => {

      isAuthenticated(req, jwt).then((decoded_token: any) => {

            const datefrom = _.get(req.query, 'datefrom');
            const dateto = _.get(req.query, 'dateto');
            const page = _.get(req.query, 'page');
            const per_page = _.get(req.query, 'per_page');
            const _export = _.get(req.query, 'export');

            const {accessLevels} = decoded_token;

            getLimitNotification(datefrom, dateto, accessLevels, page, per_page, _export).then((report) => {
                logMessage(req, decoded_token.data.sAMAccountName, 'getLimitNotification', JSON.stringify(req.query), 'N/A');
                return res.status(200).json(report);
            }).catch(err => {
                logMessage(req, decoded_token.data.sAMAccountName, 'getLimitNotification', JSON.stringify(req.query), JSON.stringify(err));

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
