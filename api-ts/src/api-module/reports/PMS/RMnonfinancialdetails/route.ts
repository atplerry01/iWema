import * as _ from 'lodash';
import { logMessage } from '../../../../util/utility';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { getTotalAccounts5KAvgByStaffIdDetail } from '../TotalAccounts5KAvgByStaffIdDetail/service';
import { getTotalLoanByStaffIdDetail } from '../TotalLoanByStaffIdDetail/service';
import { getTotalAccountsByStaffIdDetail } from '../TotalAccountsByStaffIdDetail/service';
import { getTotalAccountsByStaffIdDetailCY } from '../TotalAccountsByStaffIdDetailCY/service';
import { getTotalAccountStatusByStaffIdDetailActive } from '../TotalAccountStatusByStaffIdDetailActive/service';
import { getTotalAccountStatusByStaffIdDetailInactive } from '../TotalAccountStatusByStaffIdDetailInactive/service';
import { getTotalAccountStatusByStaffIdDetailDormant } from '../TotalAccountStatusByStaffIdDetailDormant/service';
import { getTotalReactivatedAccountsByStaffIdDetailCY } from '../TotalReactivatedAccountsByStaffIdDetailCY/service';
import { getTotalReactivatedAccountsByStaffIdDetailCM } from '../TotalReactivatedAccountsByStaffIdDetailCM/service';
import { getTotalDepositByStaffIdDetail } from '../TotalDepositByStaffIdDetail/service';


export const getRMnonfinancialdetailsRouter = (req, res, jwt: any, redis: any) => {

    isAuthenticated(req, jwt).then(async (decoded_token: any) => {

            const userId = _.get(req.query, 'userId');
            const type = _.get(req.query, 'type');

            const page = _.get(req.query, 'page', 1);
            const per_page = _.get(req.query, 'per_page', 15);
            const _export = _.get(req.query, '_export', '');
            const filterText = _.get(req.query, 'filterText', '');
          
            const staffId = decoded_token.data.sAMAccountName;          
            const {accessLevels} = decoded_token;

            try {
                let report: any;

                switch (type) {
                    case 'td':
                    report = await getTotalDepositByStaffIdDetail(staffId, userId, accessLevels, redis, page, per_page, _export, filterText);
                    break;
                    case 'tl':
                    report = await getTotalLoanByStaffIdDetail(staffId, userId, accessLevels, redis, page, per_page, _export, filterText);
                    break;
                    case 'ta':
                    report = await getTotalAccountsByStaffIdDetail(staffId, userId, accessLevels, redis, page, per_page, _export, filterText);
                    break;
                    case 'tacy':
                    report = await getTotalAccountsByStaffIdDetailCY(staffId, userId, accessLevels, redis, page, per_page, _export, filterText);
                    break;
                    case 'ta5k':
                    report = await getTotalAccounts5KAvgByStaffIdDetail(staffId, userId, accessLevels, redis, page, per_page, _export, filterText);
                    break;
                    case 'ua':
                    report = await []; // getUnfundedAccountsByStaffIdDetail(staffId, userId, accessLevels, redis, page, per_page, _export, filterText);
                    break;
                    case 'tad':
                    report = await getTotalAccountStatusByStaffIdDetailActive(staffId, userId, accessLevels, redis, page, per_page, _export, filterText);
                    break;
                    case 'tasi':
                    report = await getTotalAccountStatusByStaffIdDetailInactive(staffId, userId, accessLevels, redis, page, per_page, _export, filterText);
                    break;
                    case 'tasd':
                    report = await getTotalAccountStatusByStaffIdDetailDormant(staffId, userId, accessLevels, redis, page, per_page, _export, filterText);
                    break;
                    case 'tracy':
                    report = await getTotalReactivatedAccountsByStaffIdDetailCY(staffId, userId, accessLevels, redis, page, per_page, _export, filterText);
                    break;
                    case 'tracm':
                    report = await getTotalReactivatedAccountsByStaffIdDetailCM(staffId, userId, accessLevels, redis, page, per_page, _export, filterText);
                    break;
                    default:
                        return res.status(400).json({ error: 'Invalid request' });

                }              

                return res.status(200).json(report);                
            } catch (err) {
                logMessage(req, staffId, 'getRMnonfinancialdetails', JSON.stringify(req.query), JSON.stringify(err));

                return res.status(400).json({ error: err  });
            }

        }).catch(err => {
            return res.status(401).json({
                error: err
            });
        });

    };
