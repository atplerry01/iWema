
import * as _ from 'lodash';
import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { searchAccountByAccName } from './service';

export const searchAccountByAccNameRouter = (req, res, jwt: any, redis: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {
                const accname = _.get(req, 'params.accname');

                const {accessLevels, scopeLevel} = decoded_token;

                searchAccountByAccName(accname, accessLevels, scopeLevel, redis).then((result) => {
                    return res.status(200).json(result);
                }).catch(err => {
                   logMessage(req, decoded_token.data.sAMAccountName,
                        'searchAccountByAccName', accname, JSON.stringify(err));
                    return res.status(400).json({ error: err });
                });

            }).catch(err => {
                return res.status(401).json({ error: err });
            });

        };
