import * as yup from "yup";

export const createManagerReAssignCaseSchema = yup.object().shape({
    LOAN_ACCT_BAL: yup.string().required(),
    AgentId: yup.string().required(),
    CaseId: yup.string().required(),
    Comment: yup.string().required(),
    ReAssignAgentId: yup.string().required()
});
