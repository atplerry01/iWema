import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const update_Roles_QUERY = (roleid: string,
    role_name: string,
    status: string) => {
    roleid = mysqlSanitizeInput(roleid); 
    role_name = mysqlSanitizeInput(role_name); 
    status = mysqlSanitizeInput(status); 

    return  `UPDATE roles SET
        role_name = ${role_name},
        status = ${status}
         WHERE roleid = ${roleid}`;
};
