
import * as _ from 'lodash';
import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getAccountStatiticsByZones } from './service';

export const getAccountStatiticsByZonesGraphRouter = (req, res, jwt: any, redis: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {

        const regioncode = _.get(req.query, 'regioncode');
        const producttype = _.get(req.query, 'producttype');

        const {accessLevels, scopeLevel} = decoded_token;

        getAccountStatiticsByZones(regioncode, producttype, accessLevels, scopeLevel, redis).then((report) => {
            return res.status(200).json(report);
        }).catch(err => {
           logMessage(req, decoded_token.data.sAMAccountName, 'getAccountStatiticsByZonesGraph', JSON.stringify(req.query), JSON.stringify(err));

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
