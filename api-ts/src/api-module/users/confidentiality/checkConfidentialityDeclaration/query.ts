import { mysqlSanitizeInput } from '../../../../db/dbUtil';

export const checkConfidentialityDeclaration_QUERY = (staffId) => {
    staffId = mysqlSanitizeInput(staffId);
    return `SELECT COUNT(*) total FROM DeclaredConfidential WHERE empNo = ${staffId}`;
};

export const checkCodeOfConductDeclaration_QUERY = (staffId) => {
    staffId = mysqlSanitizeInput(staffId);
    return `SELECT COUNT(*) total FROM CodeOfConductConfidential WHERE empNo = ${staffId}`;
};

export const checkCodeOfSafePractice_QUERY = (staffId) => {
    staffId = mysqlSanitizeInput(staffId);
    return `SELECT COUNT(*) total FROM CodeOfConductSafePractice WHERE empNo = ${staffId}`;
};