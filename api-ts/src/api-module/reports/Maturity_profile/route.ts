import * as _ from 'lodash';
import { logMessage } from "../../../util/utility";
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getMaturity_profile } from './service';

  // /**
        //  * @endpoint: /api/v1/getMaturity_profile?bankcode=0&days=0
        //  * @method: GET
        //  **/

export const getMaturity_profileRouter = (req, res, jwt: any, redis: any) => {

            isAuthenticated(req, jwt).then((decoded_token: any) => {

                const bankcode = _.get(req.query, 'bankcode');
                const days = _.get(req.query, 'days');

                const {allAccess, scopeLevel} = decoded_token;
                const username = decoded_token.data.sAMAccountName;

                getMaturity_profile(days, bankcode, allAccess, scopeLevel, redis).then((report) => {

                    logMessage(req, username, 'getMaturity_profile', JSON.stringify(req.query), 'N/A');

                    return res.status(200).json(report);
                }).catch(err => {

                    logMessage(req, username, 'getMaturity_profile', JSON.stringify(req.query), JSON.stringify(err));

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
        
