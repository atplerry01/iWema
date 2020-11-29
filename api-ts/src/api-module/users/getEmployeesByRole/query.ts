import * as _ from 'lodash';
import { mysqlSanitizeInput } from '../../../db/dbUtil';

export const getEmployeesByRole_QUERY = (roleid: string) => {
     
    return `SELECT e.EmployeeNumber EmployeeNumber,e.EmployeeName EmployeeName,e.Email Email,            
        e.Job_Title JobTitle,d.dept_name Department, e.gsmno GSM, g.gradeshortname Grade,                         
        b.BranchCode BranchCode, b.BranchName BranchName, z.ZoneCode ZoneCode, z.ZoneName ZoneName,                        
        r.RegionCode RegionCode, r.RegionName RegionName                         
        FROM employee_master e                         
        LEFT JOIN Branches b ON e.branchcode = b.branchcode                        
        LEFT JOIN Zones z ON z.zonecode = b.zonecode                         
        LEFT JOIN Region r ON r.regioncode = z.regioncode                         
        LEFT JOIN departments d ON e.dept_id =d.dept_id                        
        LEFT JOIN grades g ON e.gradeid=g.gradeid                        
        WHERE e.Status='Y' AND e.roleid=${mysqlSanitizeInput(roleid)}
        order by e.gradeid,e.employment_date`;
};
