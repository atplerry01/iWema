import * as _ from 'lodash';

import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getWemaCollectReport } from './service';

 export const getWemaCollectReportRouter = (req, res, jwt: any, redis: any) => {

        isAuthenticated(req, jwt).then((decoded_token: any) => {

            const datefrom = _.get(req.query, 'datefrom');
            const dateto = _.get(req.query, 'dateto');
            const page = _.get(req.query, 'page');
            const per_page = _.get(req.query, 'per_page');
            const _webguid = _.get(req.query, 'webguid', '');
            const _export = _.get(req.query, 'export', '');

            const {accessLevels} = decoded_token;

            getWemaCollectReport(datefrom, dateto, accessLevels, redis, page, per_page, _webguid, _export).then((report) => {
                return res.status(200).json(report);
            }).catch(err => {
                logMessage(req, decoded_token.data.sAMAccountName, 'getWemaCollectReport', JSON.stringify(req.query), JSON.stringify(err));

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
