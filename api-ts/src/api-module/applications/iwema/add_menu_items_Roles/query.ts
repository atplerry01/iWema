import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const insert_menu_items_Roles_QUERY = (roleid: string,
    submenu_id: string,
    access_level_id: string,
    status: string) => {

    roleid = mysqlSanitizeInput(roleid); 
    submenu_id = mysqlSanitizeInput(submenu_id); 
    access_level_id = mysqlSanitizeInput(access_level_id); 
    status = mysqlSanitizeInput(status); 

    return `INSERT INTO menu_role_access
    (roleid,
    submenu_id,
    access_level_id,
    status)
    VALUES(${roleid},
    ${submenu_id},
    ${access_level_id},
    ${status});`;
};
