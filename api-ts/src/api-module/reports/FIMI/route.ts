import * as _ from 'lodash';

import { logMessage } from '../../../util/utility';
import { isAuthenticated } from "../../../util/isAuthenticated";
import { get_FIMI } from './service';

export const get_FIMIRouter = (req, res, jwt: any) => {

        isAuthenticated(req, jwt).then((decoded_token: any) => {
 
            const type = _.get(req.query, 'type');
             const datefrom = _.get(req.query, 'datefrom');
             const dateTo = _.get(req.query, 'dateTo'); 
             const accno = _.get(req.query, 'accno');
            const {accessLevels} = decoded_token;
             
             
            get_FIMI(type, datefrom, dateTo, accessLevels, accno).then((report) => {               
                 return res.status(200).json(report);
             }).catch(err => {
                 logMessage(req, decoded_token.data.sAMAccountName, 'get_FimiLog', JSON.stringify(req.query), JSON.stringify(err));
 
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
