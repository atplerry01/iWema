import * as _ from 'lodash';
import { logMessage } from '../../../util/utility';  
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getChannelMovement } from './service';
  

export const getChannelMovementRouter = (req, res, jwt: any, redis: any) => {

        isAuthenticated(req, jwt).then((decoded_token: any) => {

            const {accessLevels} = decoded_token;

            getChannelMovement(accessLevels, redis).then((report) => {
                logMessage(req, decoded_token.data.sAMAccountName, 'getChannelMovement', '', 'N/A');
                return res.status(200).json(report);
            }).catch(err => {
               logMessage(req, decoded_token.data.sAMAccountName, 'getChannelMovement', '', JSON.stringify(err));
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
