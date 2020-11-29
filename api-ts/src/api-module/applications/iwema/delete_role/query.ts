import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const delete_Roles_QUERY = (roleid: string) => {
    roleid = mysqlSanitizeInput(roleid); 
    return  `DELETE FROM roles WHERE roleid = ${roleid}`;
};
