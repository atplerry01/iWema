export const getTodayBirthay_Staff_QUERY = () => {

    return `SELECT     
                    e.employee_number
                    ,e.employee_firstname + ' ' + e.employee_midname + ' ' + e.employee_surname AS name 
                    ,d.description AS department
                    ,e.email
                    ,e.image_personal
                    ,e.mobile_phone           
                FROM [wemabank].[dbo].[cm_employeemaster] e JOIN [wemabank].[dbo].[cm_department] d ON e.department_id=d.department_id
                where  month(e.date_of_birth) = month(getdate())
                and day(e.date_of_birth) = day(getdate())
                and employee_status = 1 order by e.grade_id`;
};
