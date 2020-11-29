import * as _ from 'lodash';

import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { get_betCompaniesList } from './service';

export const get_betCompaniesListRouter = async (req, res, jwt: any) => {

            isAuthenticated(req, jwt).then((decoded_token: any) => {
                              
                const {accessLevels} = decoded_token;
               
                get_betCompaniesList(accessLevels).then((report) => {
                
                  return res.status(200).json(report);
                }).catch(err => {
                      logMessage(req, decoded_token.data.sAMAccountName, 'get_betCompaniesList',
                        JSON.stringify(req.query), JSON.stringify(err));

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
