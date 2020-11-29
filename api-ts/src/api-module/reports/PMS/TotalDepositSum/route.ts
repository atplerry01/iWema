import * as _ from 'lodash';
import { getTotalDepositSum } from './service';
import { logMessage } from '../../../../util/utility';
import { isAuthenticated } from "../../../../util/isAuthenticated";

export const getTotalDepositSumRouter = (req, res, jwt: any, redis: any) => {

        isAuthenticated(req, jwt).then((decoded_token: any) => {

            const userId = _.get(req.query, 'userId');
            const startDate = _.get(req.query, 'startDate');
            const endDate = _.get(req.query, 'endDate');
            const staffId = decoded_token.data.sAMAccountName;

            console.log(endDate);
           
            const {accessLevels} = decoded_token;

            getTotalDepositSum(userId, startDate, endDate, accessLevels, redis).then((report) => {
                return res.status(200).json(report);
            }).catch(err => {
                logMessage(req, staffId, 'getTotalDepositSum', JSON.stringify(req.query), JSON.stringify(err));

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
