import { createQueryBuilder, getConnection, IsNull, Not } from 'typeorm';
import { executeSQLServer } from './../../../../../db/dbUtil';
import { Archive } from './../../../../../entity/HCM/Archive';
import { ArchiveUserRequest } from './../../../../../entity/HCM/UserRequest';

export const getPendingRequestSevices = async (SelectedType) => {

    let q: any = '';
    q = `
    SELECT [id] ,[employee_id] ,[employee_number] ,[employee_surname] ,[employee_midname],[employee_firstname], 
    [employment_date], [mobile_phone], [email],[isActive] 
    FROM [X365Integration].[dbo].[ads_sync_employee_information_current]
    `;

    let userRequest: any = [];

    userRequest = await ArchiveUserRequest.find({
        where: [{ IsTreated: true, IsApproved: true, IsClosed: false }]
    });

    if (SelectedType === 'AllFiles') {
        userRequest = await ArchiveUserRequest.find({
            where: [{ IsApproved: true, IsClosed: false }]
        });
    } else if (SelectedType === 'PendingFileCollections') {
        userRequest = await ArchiveUserRequest.find({
            where: [{ IsTreated: true, IsApproved: true, FileDeliveryDate: IsNull(), IsClosed: false }]
        });
    } else if (SelectedType === 'PendingFileToBeReturned') {
        userRequest = await ArchiveUserRequest.find({
            where: [{ IsTreated: true, IsApproved: true, FileDeliveryDate: Not(IsNull()), IsClosed: false }]
        });
    } else if (SelectedType === 'History') {
        userRequest = await ArchiveUserRequest.find({
            where: [{ IsClosed: true }]
        });
    }

    let sqlResult: any = [];
    sqlResult = await executeSQLServer(q, {}, 'Xceed365');

    // const empData = await EmployeeMaster.find();
    const archive = await Archive.find();



    const finalResultA: any[] = [];
    const finalResult: any[] = [];

    userRequest.forEach(e => {
        const indx = sqlResult.findIndex(em => em.employee_number === e.FileName);

        if (indx !== -1) {
            const mergedDate = { ...e, ...sqlResult[indx] };
            finalResultA.push(mergedDate);
        }
    });

    finalResultA.forEach(e => {
        const indx = archive.findIndex(ar => ar.EmpNo === e.employee_number);
        if (indx !== -1) {
            const mergedDate = { requestId: e.Id, ...e, ...archive[indx] };
            finalResult.push(mergedDate);
        }
    });

    return finalResult;
};

export const getFileArchiveById = async (Id) => {
    return await Archive.findOne({
        where: [{ Id }]
    });
};

// getFileArchiveByFileName
export const getFileArchiveByFileName = async (fileName) => {
    return await Archive.findOne({
        where: [{ EmpNo: fileName }]
    });
};

export const updateArchiveService = async (entity) => {
    await Archive.save(entity);
};

export const getUserFileSevices = async (Id) => {
    const query = createQueryBuilder("Archive")
        .innerJoinAndSelect("Archive.Case", "case")
        .innerJoinAndSelect("CallCenter.Agent", "agent")
        .where("case.Id = :id", { id: Id });
    try {
        return await query.getMany();
    } catch (e) {
        return e;
    }
};


export const getCheckUserRequest = async (empNo): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            const q = `SELECT * FROM wema360.hcm_archive where EmpNo = '${empNo}'`;
            const returnLists = await getConnection().query(q);
            return resolve(returnLists);
        } catch (err) {
            return reject({ err, message: "No Record found" });
        }
    });

};