import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const insert_Roles_QUERY = (roleid: string,
    role_name: string,
    status: string) => {
  
    roleid = mysqlSanitizeInput(roleid); 
    role_name = mysqlSanitizeInput(role_name); 
    status = mysqlSanitizeInput(status); 

    return  `INSERT INTO roles(roleid,
        role_name,
        status)
        VALUES(${roleid},
         ${role_name},
         ${status});`;
};
