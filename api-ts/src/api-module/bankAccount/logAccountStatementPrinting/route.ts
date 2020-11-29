
import * as _ from 'lodash';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { LogTransaction } from '../../../util/logTransaction';
import { logMessage } from '../../../util/utility';

export const LogAccountStatementDownloadRouter = (req, res, jwt: any) => {

    isAuthenticated(req, jwt).then((decoded_token: any) => {

        const printingcost = _.get(req.body, 'printingcost');

        const {mail} = decoded_token.data;
        
        LogTransaction(req, mail, decoded_token.scopeLevel.branchcode, 'Bank Statement', 'Statement Download', `${printingcost}`, JSON.stringify(req.body), '').then((result) => {

            return res.status(200).json(result);
        }).catch(err => {

            logMessage(req, decoded_token.data.sAMAccountName,
                'LogAccountStatementDownload', JSON.stringify(req.query), JSON.stringify(err));

            return res.status(400).json({ error: err });
        });

    }).catch(err => {
        return res.status(401).json({ error: err });
    });

};
