import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const insert_menu_subs_QUERY = (submenu_id: string,
    menu_id: string,
    submenu_name: string,
    submenu_link: string,
    submenu_display_inside: string,
    submenu_order: number,
    favourite_status: string,
    favourite_order: string,
    status: string) => {

    submenu_id = mysqlSanitizeInput(submenu_id); 
    menu_id = mysqlSanitizeInput(menu_id); 
    submenu_name = mysqlSanitizeInput(submenu_name); 
    submenu_link = mysqlSanitizeInput(submenu_link); 
    submenu_display_inside = mysqlSanitizeInput(submenu_display_inside); 
    submenu_order = mysqlSanitizeInput(submenu_order); 
    favourite_status = mysqlSanitizeInput(favourite_status); 
    favourite_order = mysqlSanitizeInput(favourite_order); 
    status = mysqlSanitizeInput(status); 

    return `INSERT INTO menu_subs(
        submenu_id,
        menu_id,
        submenu_name,
        submenu_link,
        submenu_display_inside,
        submenu_order,
        favourite_status,
        favourite_order,
        status
        )
        VALUES(
        ${submenu_id},
        ${menu_id},
        ${submenu_name},
        ${submenu_link},
        ${submenu_display_inside},
        ${submenu_order},
        ${favourite_status},
        ${favourite_order},
        ${status}
        );`;
};
