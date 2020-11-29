import * as _ from 'lodash';

import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getPartLiquidatedFixedDepositDrilldown } from './service';

export const getPartLiquidatedFixedDepositDrilldownRouter = (req, res, jwt: any, redis: any) => {

        isAuthenticated(req, jwt.then(decoded_token => {

            const entityId = _.get(req.query, 'entityId');
            const startDate = _.get(req.query, 'startDate');
            const endDate = _.get(req.query, 'endDate');
            
            getPartLiquidatedFixedDepositDrilldown(entityId, startDate, endDate, redis).then((report) => {               
                return res.status(200).json(report);
            }).catch(err => {
                logMessage(req, decoded_token.data.sAMAccountName, 'getPartLiquidatedFixedDepositDrilldown', JSON.stringify(req.query), JSON.stringify(err));

                return res.status(400).json({
                    error: err
                });
            });

        }).catch(err => {
            return res.status(401).json({
                error: err
            });
        })
        );
    };        

