import { mysqlSanitizeInput } from '../../../../db/dbUtil';

export const acceptConfidentialityDeclaration_QUERY = (empNo, email, empName, grade, department) => {

    empNo = mysqlSanitizeInput(empNo); 
    email = mysqlSanitizeInput(email);
    empName = mysqlSanitizeInput(empName);
    grade = mysqlSanitizeInput(grade);
    department = mysqlSanitizeInput(department);

    return `INSERT INTO DeclaredConfidential(empNo, email, empName, grade, department)
            VALUES(${empNo}, ${email}, ${empName}, ${grade}, ${department})`;
};

export const acceptCodeOfConductDeclaration_QUERY = (empNo, email, empName, grade, department) => {

    empNo = mysqlSanitizeInput(empNo); 
    email = mysqlSanitizeInput(email);
    empName = mysqlSanitizeInput(empName);
    grade = mysqlSanitizeInput(grade);
    department = mysqlSanitizeInput(department);

    return `INSERT INTO CodeOfConductConfidential(empNo, email, empName, grade, department)
            VALUES(${empNo}, ${email}, ${empName}, ${grade}, ${department})`;
};

//CodeOfSafePractice

export const acceptCodeOfSafePractice_QUERY = (empNo, email, empName, grade, department) => {

    empNo = mysqlSanitizeInput(empNo); 
    email = mysqlSanitizeInput(email);
    empName = mysqlSanitizeInput(empName);
    grade = mysqlSanitizeInput(grade);
    department = mysqlSanitizeInput(department);

    return `INSERT INTO CodeOfConductSafePractice(empNo, email, empName, grade, department)
            VALUES(${empNo}, ${email}, ${empName}, ${grade}, ${department})`;
};
