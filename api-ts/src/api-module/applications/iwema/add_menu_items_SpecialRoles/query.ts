import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const insert_menu_items_SpecialRoles_QUERY = (userid: string,
    submenu_id: string,
    access_level_id: string,
    status: string) => {

    userid = mysqlSanitizeInput(userid); 
    submenu_id  = mysqlSanitizeInput(submenu_id); 
    access_level_id = mysqlSanitizeInput(access_level_id); 
    status = mysqlSanitizeInput(status); 

    return `INSERT INTO menu_special_access
    (userid,
    submenu_id,
    access_level_id,
    status)
    VALUES (${userid},
    ${submenu_id},
    ${access_level_id},
    ${status});`;
};
