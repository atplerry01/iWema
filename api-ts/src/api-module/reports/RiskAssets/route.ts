import * as _ from 'lodash';
import { logMessage } from "../../../util/utility";
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getRiskAssets } from './service';

export const getRiskAssetsRouter = (req, res, jwt: any, redis: any) => {

            isAuthenticated(req, jwt).then((decoded_token: any) => {

                const bankcode = _.get(req.query, 'bankcode');
                const classification = _.get(req.query, 'classification');

                const { allAccess, scopeLevel} = decoded_token;
                const username = decoded_token.data.sAMAccountName;

                getRiskAssets(bankcode, classification, allAccess, scopeLevel, redis).then((report) => {

                    logMessage(req, username, 'getRiskAssets', JSON.stringify(req.query), 'N/A');

                    return res.status(200).json(report);
                }).catch(err => {

                    logMessage(req, username, 'getRiskAssets', JSON.stringify(req.query), JSON.stringify(err));

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
