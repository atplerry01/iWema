import * as _ from "lodash";
import * as moment from 'moment';
import { isAuthenticated } from '../../../../../util/isAuthenticated';
import { getPendingApprovalRequestSevices, getRequestById, updateUserRequestService } from "../services/UserRequest";
import { Paginator } from './../../../../../util/utility';

export const getCheckRequestLogs = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (_decoded_token: any) => {
            const page = _.get(req.query, "page", 1);
            const per_page = _.get(req.query, "per_page", 50);

            try {
                const entity = await getPendingApprovalRequestSevices();
                const result = await Paginator(entity, page, per_page);

                return res.status(200).json({
                    data: result
                });
            } catch (err) {
                return res.status(400).json({ error: err });
            }
        })
        .catch(err => {
            return res.status(400).json({
                data: err
            });
        });
};

export const postRequestApproval = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (_decoded_token: any) => {
            const Id = _.get(req.body, "Id");
            const actionX = _.get(req.body, "Action");
            const comment = _.get(req.body, "CheckerComment");

            try {
                const requestDetail = await getRequestById(Id);

                if (requestDetail) {
                    const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

                    if (actionX === 'Approval') {
                        requestDetail.IsApproved = true;
                    } else {
                        requestDetail.IsApproved = false;
                    }

                    requestDetail.ApprovalDate = today;
                    requestDetail.IsTreated = true;
                    requestDetail.Status = 'CheckerApproval';
                    requestDetail.CheckerComment = comment;

                    await updateUserRequestService(requestDetail);

                    return res.status(200).json({
                        data: true
                    });
                }
            } catch (err) {
                return res.status(400).json({ error: err });
            }
        })
        .catch(err => {
            return res.status(400).json({
                data: err
            });
        });
};
