import { Case } from './../../../../../entity/RCU/LoanCollection/Case';

export const getNewCollectionSevices = async () => {
    return await Case.find({
        where: [{ IsAssigned: false }]
    });
};

export const getCaseById = async (Id) => {
    return await Case.findOne({
        where: [{ Id }]
    });
};

export const updateCaseService = async (entity) => {
    await Case.save(entity);
};

