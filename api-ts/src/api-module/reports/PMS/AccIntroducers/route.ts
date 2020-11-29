import * as _ from 'lodash';

import { logMessage } from '../../../../util/utility';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { getAccIntroducers } from './service';


export const getAccIntroducersRouter = (req, res, jwt: any, redis: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {

        const datefrom = _.get(req.query, 'datefrom', '');
        const dateto = _.get(req.query, 'dateto', '');
        const accnumber = _.get(req.query, 'accnumber', '');

        const page = _.get(req.query, 'page', 1);
        const per_page = _.get(req.query, 'per_page', 15);

        const staffId = decoded_token.data.company;

        getAccIntroducers(staffId, datefrom, dateto, accnumber, redis, page, per_page).then((report) => {
            return res.status(200).json(report);
        }).catch(err => {
            logMessage(req, decoded_token.data.sAMAccountName, 'getAccIntroducers', JSON.stringify(req.query), JSON.stringify(err));

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

