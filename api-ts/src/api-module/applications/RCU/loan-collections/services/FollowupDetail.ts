import { FollowUpDetail } from './../../../../../entity/RCU/LoanCollection/FollowUpDetail';

export const getFollowUpDetailService = async CaseId => {
    return await FollowUpDetail.find({
        where: { CaseId },
        order: { createdAt: "DESC"}
    });
};

export const createFollowUpDetailService = async (
    FollowUpDate, Outcome, ContactType, ContactName, ContactPlace,
    AmountCollected, NextAction, NextContactDate, Remarks,
    PromisedToPay, ReminderType, PromisePayDate, PickUpRequired,
    FollowUpStatus, AgentId, CaseId) => {

    return await FollowUpDetail.create({
        FollowUpDate,
        Outcome,
        ContactType,
        ContactName,
        ContactPlace,
        AmountCollected,
        NextAction,
        NextContactDate,
        Remarks,
        PromisedToPay,
        ReminderType,
        PromisePayDate,
        PickUpRequired,
        FollowUpStatus,
        AgentId,
        CaseId
    }).save();
};