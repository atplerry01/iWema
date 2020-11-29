import * as _ from 'lodash';

import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getIndividualBorrower } from './service';

export const getIndividualBorrowerRouter = (req, res, jwt: any, redis: any) => {

        isAuthenticated(req, jwt).then((decoded_token: any) => {

            const callDate = _.get(req.query, 'callDate');
            const page = _.get(req.query, 'page', 1);
            const per_page = _.get(req.query, 'per_page', 50);
           
            const {accessLevels} = decoded_token;
            
            getIndividualBorrower(callDate, accessLevels, redis, page, per_page).then((report) => {               
                return res.status(200).json(report);
            }).catch(err => {
                logMessage(req, decoded_token.data.sAMAccountName, 'getIndividualBorrower', JSON.stringify(req.query), JSON.stringify(err));

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
