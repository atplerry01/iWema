export const getTotalEmpGrade_QUERY = () => {

    return `SELECT  COUNT(e.gradeid) AS TotalGrade, gradeshortname
        FROM employee_master e
        LEFT JOIN grades g ON e.gradeid=g.gradeid
        WHERE Status='Y' GROUP BY e.gradeid order by e.gradeid`;
};
