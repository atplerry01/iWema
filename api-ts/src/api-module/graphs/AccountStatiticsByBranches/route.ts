
import * as _ from 'lodash';
import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getAccountStatiticsByBranches } from './service';

export const getAccountStatiticsByBranchesRouter = (req, res, jwt: any, redis: any) => {

   isAuthenticated(req, jwt).then((decoded_token: any) => {

        const zonecode = _.get(req.query, 'zonecode');
        const producttype = _.get(req.query, 'producttype');

        const {accessLevels, scopeLevel} = decoded_token;

        getAccountStatiticsByBranches(zonecode, producttype, accessLevels, scopeLevel, redis).then((report) => {
            return res.status(200).json(report);
        }).catch(err => {
            logMessage(req, decoded_token.data.sAMAccountName, 'getAccountStatiticsByBranchesGraph', JSON.stringify(req.query), JSON.stringify(err));

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
