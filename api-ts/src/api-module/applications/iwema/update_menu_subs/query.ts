import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const update_menu_subs_QUERY = (
    submenu_id: string,
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

    return `UPDATE menu_subs SET 
                menu_id = ${menu_id},
                submenu_name = ${submenu_name},
                submenu_link = ${submenu_link},
                submenu_display_inside = ${submenu_display_inside},
                submenu_order = ${submenu_order},
                favourite_status = ${favourite_status},
                favourite_order = ${favourite_order},
                status = ${status}
            WHERE submenu_id = ${submenu_id};`;
};
