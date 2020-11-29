export const getEmployeeByStaffNo_QUERY = (staffNo) => {

    return `SELECT  e.EmployeeNumber,e.EmployeeName,e.Email,e.Job_Title,d.dept_name DepartmentName,e.gsmno, 
          g.gradeshortname FROM employee_master e
          LEFT JOIN grades g ON e.gradeid=g.gradeid
          LEFT JOIN departments d ON e.dept_id=d.dept_id
          WHERE e.EmployeeNumber LIKE '%${staffNo}' AND e.Status='Y'`;

};
