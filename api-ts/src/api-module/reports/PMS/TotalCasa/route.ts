import * as _ from 'lodash';

import { logMessage } from '../../../../util/utility';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { getTotalCasa } from './service';

export const getTotalCasaRouter = (req, res, jwt: any, redis: any) => {

        isAuthenticated(req, jwt).then((decoded_token: any) => {

            const userId = _.get(req.query, 'userId');
            const staffId = decoded_token.data.sAMAccountName;
           
            const {accessLevels} = decoded_token;

            getTotalCasa(staffId, userId, accessLevels, redis).then((report) => {
                return res.status(200).json(report);
            }).catch(err => {
               logMessage(req, staffId, 'getTotalCasa', JSON.stringify(req.query), JSON.stringify(err));

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
