import * as _ from "lodash";
import * as moment from 'moment';
import { getCheckUserRequest } from "../services/Archive";
import { getFileManagerLogSevices } from '../services/ArchiveLog';
import { getFileManagerSevices } from '../services/EmployeeMaster';
import { createUserRequestService, getUserRequestSevices } from "../services/UserRequest";
import { isAuthenticated } from './../../../../../util/isAuthenticated';
import { Paginator } from './../../../../../util/utility';

export const getUserRequestLogs = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (decoded_token: any) => {
            const page = _.get(req.query, "page", 1);
            const per_page = _.get(req.query, "per_page", 50);

            let requestType = _.get(req.query, "requestType", 'all');
            const startDate = _.get(req.query, "startDate");
            const endDate = _.get(req.query, "endDate");
            
            // TODO: Validate for Date Selection
            try {
                if (requestType === null || requestType === '') {
                    requestType = 'all';
                }

                const requestUser = decoded_token.data.mail;
                const entity = await getUserRequestSevices(requestUser, requestType, startDate, endDate);
                
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

export const createUserRequest = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (decoded_token: any) => {
            const fileName = _.get(req.body, "FileName");
            const comment = _.get(req.body, "Comment");

            try {
                const requestUser = decoded_token.data.mail;
                const requestFile = await getCheckUserRequest(fileName);

                if (requestFile && requestFile.length > 0) {
                    const requestDate = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
                    await createUserRequestService(requestUser, fileName, comment, requestDate);
                    return res.status(200).json({
                        data: true
                    });
                } else {
                    return res.status(200).json({
                        data: false
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

export const getArchiveFiles = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (_decoded_token: any) => {
            const page = _.get(req.query, "page", 1);
            const per_page = _.get(req.query, "per_page", 50);
            const searchText = _.get(req.query, "searchText");

            try {
                const entity = await getFileManagerSevices(searchText);
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

export const getArchiveFileLogs = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (_decoded_token: any) => {
            const selectedFile = _.get(req.query, "selectedFile");
            const page = _.get(req.query, "page", 1);
            const per_page = _.get(req.query, "per_page", 50);

            try {
                const entity = await getFileManagerLogSevices(selectedFile);
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

export const getUserArchiveFiles = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (_decoded_token: any) => {
            const page = _.get(req.query, "page", 1);
            const per_page = _.get(req.query, "per_page", 50);

            try {
                const entity = []; // await getUserFileSevices();
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
