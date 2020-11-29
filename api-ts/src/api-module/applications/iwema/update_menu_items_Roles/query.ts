import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const update_menu_items_Roles_QUERY = (idno: number, roleid: string, access_level_id: string, status: string) => {
    idno = mysqlSanitizeInput(idno); 
    roleid = mysqlSanitizeInput(roleid); 
    access_level_id = mysqlSanitizeInput(access_level_id); 
    status = mysqlSanitizeInput(status); 

return `UPDATE menu_role_access SET
roleid = ${roleid},
access_level_id = ${access_level_id},
status = ${status} 
WHERE idno = ${idno}`;
};
