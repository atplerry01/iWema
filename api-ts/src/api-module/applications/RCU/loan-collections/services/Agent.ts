import { Agent } from './../../../../../entity/RCU/LoanCollection/Agent';

export const getAgentId = async (Id) => {
    return await Agent.findOne({
        where: [{ Id }]
    });
};

export const getAvailableAgentCategoryService = async (AgentCategory, Zone?) => {

    if (Zone === '' || Zone === null || Zone === undefined) {
        return await Agent.find({
            where: [{ AgentCategory, IsAvailable: true }],
        });
    } else {
        return await Agent.find({
            where: [{ AgentCategory, IsAvailable: true, Zone }],
        });
    }

};

export const getAgentDetailService = async (Email, AgentCategory) => {
    return await Agent.findOne({
        where: [{ Email, AgentCategory }],
        order: { ActiveCount: "ASC" }
    });
};

export const getAgentCategoryService = async (category) => {

    if (category === 'all' || category === '') {
        return await Agent.find({
            order: { ActiveCount: "ASC" }
        });
    } else if (category) {
        return await Agent.find({
            where: [{ AgentCategory: category }],
        });
    } else {
        return [];
    }
};


export const getEscalatedAgentService = async (AgentCategory) => {
    return await Agent.findOne({
        where: [{ AgentCategory, IsAvailable: true }],
        order: { ActiveCount: "ASC" }
    });
};

export const getEscalatedAgentWithZoneService = async (AgentCategory, Zone) => {    
    return await Agent.findOne({
        where: [{ AgentCategory, IsAvailable: true, Zone }],
        order: { ActiveCount: "ASC" }
    });
};

export const createAgentService = async (Email, Name, AgentCategory, Zone) => {
    return await Agent.create({
        Email, Name, AgentCategory, Zone, ActiveCount: 0, IsAvailable: true, AgentType: 'User'
    }).save();
};

export const updateAgentCaseCountService = async (entity) => {
    await Agent.save(entity);
};


