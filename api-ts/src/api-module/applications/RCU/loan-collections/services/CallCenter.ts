import { createQueryBuilder } from 'typeorm';
import { CallCenter } from './../../../../../entity/RCU/LoanCollection/CallCenter';

export const getCallCenterSevices = async (Id) => {
    const query = createQueryBuilder("CallCenter")
        .innerJoinAndSelect("CallCenter.Case", "case")
        .innerJoinAndSelect("CallCenter.Agent", "agent")
        .where("case.Id = :id", { id: Id });
    try {
        return await query.getMany();
    } catch (e) {
        return e;
    }
};

export const createCallCenterService = async (CaseId, AgentId, Comment) => {
    return await CallCenter.create({
        CaseId, AgentId, Comment
    }).save();
};
