import * as _ from 'lodash';

import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getFirstTimeDebit } from '../FirstTimeDebit/service';



  export const  getFirstTimeDebitRouter = (req, res, jwt, redis: any) => {

            isAuthenticated(req, jwt).then((decoded_token: any) => {

                //  console.log('decoded_token:', decoded_token);

                const branchcode = _.get(req.query, 'branchcode');

                const { accessLevels, scopeLevel} = decoded_token;

                getFirstTimeDebit(branchcode, accessLevels, scopeLevel, redis).then((report) => {
                    logMessage(req, decoded_token.data.sAMAccountName, 'getFirstTimeDebit', branchcode, 'N/A');
                    return res.status(200).json(report);
                }).catch(err => {
                    logMessage(req, decoded_token.data.sAMAccountName, 'getFirstTimeDebit', branchcode, JSON.stringify(err));
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

