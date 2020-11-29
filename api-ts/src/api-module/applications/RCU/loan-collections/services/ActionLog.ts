import { ActionLog } from './../../../../../entity/RCU/LoanCollection/ActionLog';

export const getCaseActionLogService = async (CaseId) => {
    return await ActionLog.find({ 
        where: [{ CaseId }],
        // select: ["Id", "Stage", "Comment", "Action", "createdAt"],
    });
};

export const createActionLogService = async (CaseId, AgentId, Action, Stage, Comment, AgentName) => {
    return await ActionLog.create({
        CaseId, AgentId, Action, Stage, Comment, AgentName
    }).save();
};



