import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const update_menu_items_SpecialRoles_QUERY = (
    idno: number, 
    userid: string,
    submenu_id: string,
    access_level_id: string,
    status: string) => {

    idno = mysqlSanitizeInput(idno); 
    userid = mysqlSanitizeInput(userid); 
    submenu_id  = mysqlSanitizeInput(submenu_id); 
    access_level_id = mysqlSanitizeInput(access_level_id); 
    status = mysqlSanitizeInput(status); 

    return `UPDATE menu_special_access SET
    userid = ${userid},
    submenu_id = ${submenu_id},
    access_level_id = ${access_level_id},
    status = ${status}
    WHERE idno = ${idno}`;
};
