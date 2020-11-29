export const stageId = {
    teleCollector: 1,
    fieldCollector: 2,
    reposessionCollector: 3,
    litigationCollector: 4
};

export const actionId = {
    initiateEscalation: 1, // Agent
    approveEscalation: 2, // Manager
    rejectEscalation: 3, // Manager
    initiateClose: 4, // Agent
    approveClose: 5, // Manager
    rejectClose: 6, // Manager
    initiateAssignment: 7, // Auto
    caseReAssignment: 8, // Manager
    escalationAssignment: 9, // Auto
    flagReAssignment: 10,
    initiateFlag: 11
};

export const managerActions = {
    ApproveEscalateCase: 'ApproveEscalateCase',
    RejectEscalateCase: 'RejectEscalateCase',
    ApproveCloseCase: 'ApproveCloseCase',
    RejectCloseCase: 'RejectCloseCase',
    CaseReAssignment: 'CaseReAssignment',
    FlagReAssignment: 'FlagReAssignment'
};

export const agentActions = {
    InitiateEscalationCase: 'InitiateEscalationCase',
    InitiateCloseCase: 'InitiateCloseCase',
    InitiateFlag: 'InitiateFlag'
};

export const agentCategoryId = {
    initiateEscalation: 1,
    approveEscalation: 2,
    rejectEscalation: 3,
    initiateClose: 4,
    approveClose: 5,
    rejectClose: 6,
    initiateAssignment: 7
};

export const constCase = {
    openCases: 'openCases',
    markClosedCases: 'markClosedCases',
    closedCases: 'closedCases',
    markEscalatedCases: 'markEscalatedCases',
    escalatedCases: 'escalatedCases',
    flagedCases: 'flagedCases',

    teleManagerCollectorCases: 'teleManagerCollectorCases',
    
    teleMarkClosedCases: 'markClosedCases',
    teleClosedCases: 'closedCases',
    teleMarkEscalatedCases: 'markEscalatedCases',
    teleEscalatedCases: 'escalatedCases',
    teleFlagedCases: 'flagedCases',

    teleCollectorCases: 'teleCollectorCases',
    fieldCollectorCases: 'fieldCollectorCases',

    agentOpenCollectorCases: 'agentOpenCollectorCases',
    agentMarkEscalatedCollectorCases: 'agentMarkEscalatedCollectorCases',
    agentMarkClosedCollectorCases: 'agentMarkClosedCollectorCases',
    agentClosedCollectorCases: 'agentClosedCollectorCases',
    agentFlagedCollectorCases: 'agentFlagedCollectorCases',
    agentTreatedCollectorCases: 'agentTreatedCollectorCases',
};

export const accessLevel = {
    followUpManager: 'FM',
    teleCollector: 'TC',
    fieldCollector: 'FC',
    reposessionManager: 'RPM',
    reposessionAgent: 'RPA',
    litigationManager: 'LIM',
    litigationAgent: 'LIA'
};

export const searchType = {
    searchTextOnly: 'searchTextOnly',
    dateRangeOnly: 'dateRangeOnly',
    searchAll: 'searchAll'
};
