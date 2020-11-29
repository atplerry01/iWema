
import * as _ from 'lodash';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getBranchNetwork } from './service';

export const getBranchNetworkRouter = (req, res, jwt: any) => {

    isAuthenticated(req, jwt).then((_decoded_token) => {

        const drilldownLevel = _.get(req.query, 'drilldownLevel');
        const code = _.get(req.query, 'code');

        // console.log('decoded_token:', decoded_token);
        getBranchNetwork(drilldownLevel, code).then((user) => {
            return res.status(200).json(user);
        }).catch(err => {
            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({
            error: err
        });
    });

};
