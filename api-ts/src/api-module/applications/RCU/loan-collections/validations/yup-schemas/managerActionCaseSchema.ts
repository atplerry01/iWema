import * as yup from "yup";

export const createManagerActionCaseSchema = yup.object().shape({
    LOAN_ACCT_BAL: yup.string().required(),
    AgentId: yup.string().required(),
    StageId: yup.number().required(),
    CaseId: yup.string().required(),
    Comment: yup.string().required()
});
