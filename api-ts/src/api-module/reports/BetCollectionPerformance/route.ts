import * as _ from 'lodash';
import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { get_BetCollectionPerformance } from './service';

export const  get_BetCollectionPerformanceRouter = (req, res, jwt: any, redis: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {

            const accountNo = _.get(req.query, 'accountNo');
            const startDate = _.get(req.query, 'startDate');
            const endDate = _.get(req.query, 'endDate');
            
            get_BetCollectionPerformance(accountNo, startDate, endDate, redis).then((report) => {               
                return res.status(200).json(accountNo + report);
            }).catch(err => {
                logMessage(req, decoded_token.data.sAMAccountName, 'get_BetCollectionPerformance', JSON.stringify(req.query), JSON.stringify(err));

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
