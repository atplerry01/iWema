export const searchEmployees_QUERY = (searchterm, regioncode, zonecode, branchcode) => {

    let query = `SELECT e.EmployeeNumber EmployeeNumber,e.EmployeeName EmployeeName,e.Email Email,            
        e.Job_Title JobTitle,d.dept_name Department, e.gsmno GSM, g.gradeshortname Grade,                         
        b.BranchCode BranchCode, b.BranchName BranchName, z.ZoneCode ZoneCode, z.ZoneName ZoneName,                        
        r.RegionCode RegionCode, r.RegionName RegionName                         
        FROM employee_master e                         
        LEFT JOIN Branches b ON e.branchcode = b.branchcode                        
        LEFT JOIN Zones z ON z.zonecode = b.zonecode                         
        LEFT JOIN Region r ON r.regioncode = z.regioncode                         
        LEFT JOIN departments d ON e.dept_id =d.dept_id                        
        LEFT JOIN grades g ON e.gradeid=g.gradeid                        
        WHERE e.Status='Y' `;

    if (regioncode && regioncode !== 'undefined') {
        query = ` ${query} AND r.regioncode = ${regioncode}`;
    }

    if (zonecode && zonecode !== 'undefined') {
        query = ` ${query} AND z.ZoneCode = ${zonecode}`;
    }

    if (branchcode && branchcode !== 'undefined') {
        query = ` ${query} AND b.branchcode = '${branchcode}'`;
    }


    if (searchterm && searchterm !== 'undefined') {
        query = ` ${query} AND (EmployeeName LIKE '%${searchterm}%' 
                OR  Email LIKE '%${searchterm}%' OR  EmployeeNumber = '${searchterm}' )`;
    }


    query = ` ${query} order by e.gradeid,e.employment_date`;
    // console.log('query:', query);
    return query;
};
