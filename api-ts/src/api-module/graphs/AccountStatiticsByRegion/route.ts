
import * as _ from 'lodash';
import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getAccountStatiticsByRegion } from './service';

export const getAccountStatiticsByRegionGraphRouter = (req, res, jwt: any, redis: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {

        const producttype = _.get(req.params, 'producttype');

        const {accessLevels, scopeLevel} = decoded_token;

        getAccountStatiticsByRegion(producttype, accessLevels, scopeLevel, redis).then((report) => {
            return res.status(200).json(report);
        }).catch(err => {
            logMessage(req, decoded_token.data.sAMAccountName, 'getAccountStatiticsByRegionGraph', producttype, JSON.stringify(err));

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
