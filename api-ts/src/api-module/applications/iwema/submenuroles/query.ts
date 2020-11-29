import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const get_menu_items_Roles_QUERY = (submenu_id) => {
    return  `                
        SELECT 
        a.idno,
        a.roleid,
        r.role_name,
        a.submenu_id,
        a.access_level_id,
        a.status
        FROM menu_role_access a JOIN roles r
        ON a.roleid = r.roleid
        WHERE submenu_id = ${mysqlSanitizeInput(submenu_id )}
        ORDER BY status Desc, access_level_id`;
};

export const get_menu_items_SpecialRoles_QUERY = (submenu_id) => {
    return  `     
    SELECT  idno,
    userid,
    submenu_id,
    access_level_id,
    status
        FROM menu_special_access
        WHERE submenu_id = ${mysqlSanitizeInput(submenu_id )}
        ORDER BY status Desc, access_level_id`;
};
