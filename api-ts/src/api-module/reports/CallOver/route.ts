
import * as _ from 'lodash';
import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getCallOver } from './service';

export const getCallOverRouter = (req, res, jwt: any, redis: any) => {

        isAuthenticated(req, jwt).then((decoded_token: any) => {


            const selectedDate = _.get(req.query, 'selecteddate');
            const branchCode = _.get(req.query, 'branchCode');
            const page = _.get(req.query, 'page');
            const per_page = _.get(req.query, 'per_page');
            const filterUserId = _.get(req.query, 'filterUserId', '');
            const _export = _.get(req.query, 'export');


            const {accessLevels, scopeLevel} = decoded_token;
            const staffId = decoded_token.data.company;
            const username = decoded_token.data.sAMAccountName;

            getCallOver(staffId, selectedDate, branchCode, accessLevels, scopeLevel, redis, page, per_page, filterUserId, _export).then((report) => {

                logMessage(req, username, 'getCallOver', JSON.stringify(req.query), 'N/A');

                return res.status(200).json(report);
            }).catch(err => {
                logMessage(req, username, 'getCallOver', JSON.stringify(req.query), JSON.stringify(err));

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
