import { CustomerContact } from './../../../../../entity/RCU/LoanCollection/CustomerContact';

export const getCaseCustomerDetailService = async CaseId => {
    return await CustomerContact.find({
        CaseId
    });
};

export const createCaseCustomerService = async (Name, Address, Location, State, Telephone1, Telephone2, CaseId) => {
    return await CustomerContact.create({
        Name,
        Address,
        Location,
        State,
        Telephone1,
        Telephone2,
        CaseId
    }).save();
};
