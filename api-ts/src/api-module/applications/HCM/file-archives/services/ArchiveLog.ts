import { ArchiveLog } from './../../../../../entity/HCM/ArchiveLog';



export const createArchiveLogService = async (entity) => {
    return await ArchiveLog.create(entity).save();
};

export const getArchiveLogSevices = async (selectedFile, ActionType) => {
    let archiveLogData: any = [];
    
    archiveLogData = await ArchiveLog.find({ FileArchiveId: selectedFile, ActionType });

    return archiveLogData;
};

export const getFileManagerLogSevices = async (selectedFile) => {
    let archiveLogData: any = [];

    archiveLogData = await ArchiveLog.find({ FileArchiveId: selectedFile });

    return archiveLogData;
};


