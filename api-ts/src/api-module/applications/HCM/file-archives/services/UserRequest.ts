import { getConnection } from "typeorm";
import { ArchiveUserRequest } from './../../../../../entity/HCM/UserRequest';

export const getUserRequestSevices = async (requestUser, requestType, startDate, endDate): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let q;
            
            if (requestType === 'all') {
                q = `SELECT * FROM wema360.hcm_user_request where RequestUser = '${requestUser}'  AND IsClosed = FALSE`;
            } else {
                q = `SELECT * FROM wema360.hcm_user_request where RequestUser = '${requestUser}' Status = '${requestType}' createdAt between '${startDate}' and '${endDate}'  AND IsClosed = FALSE`;
            }

            // tslint:disable-next-line: max-line-length
            const returnLists = await getConnection().query(q);
            return resolve(returnLists);
        } catch (err) {
            return reject({ err, message: "No Record found" });
        }
    });

};

export const getFileManagerRequestService = async (requestType, startDate, endDate): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let q;

            if (requestType === 'all') {
                q = `SELECT * FROM wema360.hcm_user_request where IsClosed = FALSE`;
            } else {
                q = `SELECT * FROM wema360.hcm_user_request Status = '${requestType}' createdAt between '${startDate}' and '${endDate}'  AND IsClosed = FALSE`;
            }

            // tslint:disable-next-line: max-line-length
            const returnLists = await getConnection().query(q);
            return resolve(returnLists);
        } catch (err) {
            return reject({ err, message: "No Record found" });
        }
    });
};



export const createUserRequestService = async (RequestUser, FileName, Comment, RequestDate?, ApprovalDate?, FileDeliveryDate?, FileReturnDate?) => {
    return await ArchiveUserRequest.create({
        RequestUser, FileName, Comment, RequestDate, ApprovalDate, FileDeliveryDate, FileReturnDate
    }).save();
};



export const getPendingApprovalRequestSevices = async () => {
    return await ArchiveUserRequest.find({
        where: [{ IsTreated: false, IsClosed: false }]
    });
};

export const getRequestById = async (Id) => {
    return await ArchiveUserRequest.findOne({
        where: [{ Id }]
    });
};

export const getRequestById2 = async (Id): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let q;
            q = `SELECT * FROM wema360.hcm_user_request where Id = '${Id}'  AND IsClosed = FALSE`;

            // tslint:disable-next-line: max-line-length
            const returnLists = await getConnection().query(q);
            return resolve(returnLists);
        } catch (err) {
            return reject({ err, message: "No Record found" });
        }
    });

};

export const updateUserRequestService = async (entity) => {
    await ArchiveUserRequest.save(entity);
};

