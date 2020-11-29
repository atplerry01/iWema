
import * as _ from 'lodash';
import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { getCustomerAccountsTransStat } from './service';

export const getCustomerAccountsTransStatRouter = (req, res, jwt: any) => {

  isAuthenticated(req, jwt).then((decoded_token: any) => {
        const accno = _.get(req.query, 'accno');
        const cDate = _.get(req.query, 'cDate');
        const cMonthStartDate = _.get(req.query, 'cMonthStartDate');
        const cMonthEndDate = _.get(req.query, 'cMonthEndDate');
        const cYearStartDate = _.get(req.query, 'cYearStartDate');
        const cYearEndDate = _.get(req.query, 'cYearEndDate');

        getCustomerAccountsTransStat(accno, cDate, cMonthStartDate, cMonthEndDate, cYearStartDate, cYearEndDate).then((result) => {

            logMessage(req, decoded_token.data.sAMAccountName,
                'getCustomerAccountsTransStat', JSON.stringify(req.query), 'N/A');

            return res.status(200).json(result);
        }).catch(err => {

           logMessage(req, decoded_token.data.sAMAccountName,
                'getCustomerAccountsTransStat', JSON.stringify(req.query), JSON.stringify(err));

            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};
