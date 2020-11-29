import * as _ from "lodash";
import * as moment from 'moment';
import { isAuthenticated } from '../../../../../util/isAuthenticated';
import { getFileArchiveByFileName, getFileArchiveById, getPendingRequestSevices, updateArchiveService } from "../services/Archive";
import { createArchiveLogService, getArchiveLogSevices } from "../services/ArchiveLog";
import { getFileManagerRequestService, getRequestById, updateUserRequestService } from "../services/UserRequest";
import { Paginator } from './../../../../../util/utility';

export const getFileManagerRequests = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (_decoded_token: any) => {
            const page = _.get(req.query, "page", 1);
            const per_page = _.get(req.query, "per_page", 50);

            let requestType = _.get(req.query, "requestType", 'all');
            const startDate = _.get(req.query, "startDate");
            const endDate = _.get(req.query, "endDate");

            try {
                if (requestType === null || requestType === '') {
                    requestType = 'all';
                }

                const entity = await getFileManagerRequestService(requestType, startDate, endDate);
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

export const getPendingRequests = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (_decoded_token: any) => {
            const SelectedType = _.get(req.query, "SelectedType");
            const page = _.get(req.query, "page", 1);
            const per_page = _.get(req.query, "per_page", 50);

            try {
                const entity = await getPendingRequestSevices(SelectedType);
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

// GiveOut File
export const GiveOutFile = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (decoded_token: any) => {
            const requestId = _.get(req.body, "requestId");
            const RequestUser = _.get(req.body, "RequestUser");
            const FileName = _.get(req.body, "FileName");
            const Comment = _.get(req.body, "ArchivistComment");

            console.log('fileout');
            
            try {
                const fileArchive = await getFileArchiveByFileName(FileName);
                let archiveLog: any = {};

                if (fileArchive && fileArchive.IsInShelf) {
                    fileArchive.IsInShelf = false;

                    archiveLog = {
                        FileArchiveId: fileArchive.Id,
                        BoxNumber: fileArchive.BoxNumber,
                        RackRef: fileArchive.RackRef,
                        ActionType: 'FileOut',
                        ActionAgent: RequestUser,
                        ModeratorAgent: decoded_token.data.sAMAccountName,
                        Comment: Comment
                    };

                    // TODO:
                    const requestDetail = await getRequestById(requestId);

                    if (requestDetail) {
                        const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');
                        requestDetail.FileDeliveryDate = today;

                        await updateUserRequestService(requestDetail);
                    }

                    await updateArchiveService(fileArchive);
                    await createArchiveLogService(archiveLog);
                }

                return res.status(200).json({
                    data: true
                });
            } catch (err) {
                console.log('err', err);
                return res.status(400).json({ error: err });
            }
        })
        .catch(err => {
            return res.status(400).json({
                data: err
            });
        });
};

export const ReturnFile = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (decoded_token: any) => {
            const requestId = _.get(req.body, "requestId");
            const ArchiveId = _.get(req.body, "Id");
            const RequestUser = _.get(req.body, "RequestUser");
            const Comment = _.get(req.body, "ArchivistComment");

            try {
                const requestDetail = await getRequestById(requestId);
                const fileArchive = await getFileArchiveById(ArchiveId);
                
                let archiveLog: any = {};

                const today = moment(new Date()).format('YYYY-MM-DD hh:mm:ss');

                if (requestDetail) {
                    requestDetail.FileReturnDate = today;
                    requestDetail.IsClosed = true;
                }

                if (fileArchive) {
                    fileArchive.IsInShelf = true;
                    
                    archiveLog = {
                        FileArchiveId: fileArchive.Id,
                        BoxNumber: fileArchive.BoxNumber,
                        RackRef: fileArchive.RackRef,
                        ActionType: 'Return File',
                        ActionAgent: RequestUser, // 'Akinsanya Olanrewaju', 
                        ModeratorAgent: decoded_token.data.sAMAccountName,
                        Comment: Comment
                    };

                    await updateUserRequestService(requestDetail);
                    await updateArchiveService(fileArchive);
                    await createArchiveLogService(archiveLog);
                }

                return res.status(200).json({
                    data: true
                });
            } catch (err) {
                console.log('err', err);
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
            const ActionType = _.get(req.query, "ActionType");
            const ArchiveId = _.get(req.query, "selectedFile");
            const page = _.get(req.query, "page", 1);
            const per_page = _.get(req.query, "per_page", 50);

            try {
                const entity = await getArchiveLogSevices(ArchiveId, ActionType);
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

///////////
export const updateArchiveBox = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (decoded_token: any) => {
            const Id = _.get(req.body, "Id");
            const BoxNumber = _.get(req.body, "BoxNumber");
            const RackRef = _.get(req.body, "RackRef");
            const Comment = _.get(req.body, "Comment");

            try {
                const fileArchive = await getFileArchiveById(Id);
                let archiveLog: any = {};

                if (fileArchive) {
                    fileArchive.BoxNumber = BoxNumber;
                    fileArchive.RackRef = RackRef;

                    archiveLog = {
                        FileArchiveId: fileArchive.Id,
                        BoxNumber: BoxNumber,
                        RackRef: RackRef,
                        ActionType: 'UpdateBox',
                        ActionAgent: decoded_token.data.sAMAccountName, // 'Akinsanya Olanrewaju', 
                        ModeratorAgent: 'Olanrewaju',
                        Comment: Comment
                    };

                    await updateArchiveService(fileArchive);
                    await createArchiveLogService(archiveLog);
                }

                return res.status(200).json({
                    data: true
                });
            } catch (err) {
                console.log('err', err);
                return res.status(400).json({ error: err });
            }
        })
        .catch(err => {
            return res.status(400).json({
                data: err
            });
        });
};

export const updateArchiveFiles = (req, res, jwt) => {
    isAuthenticated(req, jwt)
        .then(async (decoded_token: any) => {
            const Id = _.get(req.body, "Id");
            const ActionType = _.get(req.body, "ActionType");
            const Comment = _.get(req.body, "Comment");

            try {
                const fileArchive = await getFileArchiveById(Id);
                let archiveLog: any = {};

                if (fileArchive) {
                    if (ActionType === 'Collection') {
                        fileArchive.IsInShelf = false;
                    } else {
                        fileArchive.IsInShelf = true;
                    }

                    archiveLog = {
                        FileArchiveId: fileArchive.Id,
                        BoxNumber: fileArchive.BoxNumber,
                        RackRef: fileArchive.RackRef,
                        ActionType: ActionType,
                        ActionAgent: decoded_token.data.sAMAccountName,
                        ModeratorAgent: 'Olanrewaju', // TODO:
                        Comment: Comment
                    };

                    await updateArchiveService(fileArchive);
                    await createArchiveLogService(archiveLog);
                }

                return res.status(200).json({
                    data: true
                });
            } catch (err) {
                console.log('err', err);
                return res.status(400).json({ error: err });
            }
        })
        .catch(err => {
            return res.status(400).json({
                data: err
            });
        });
};

