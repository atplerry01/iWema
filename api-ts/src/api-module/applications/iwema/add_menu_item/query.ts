import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const insert_menu_items_QUERY = (
    menu_id: string,
    menu_name: string,
    menu_order: number,
    menu_image: string,
    menu_link: string,
    standalone: string,
    status: string,
    menu_display_inside: string
    ) => {

        menu_id = mysqlSanitizeInput(menu_id); 
        menu_name = mysqlSanitizeInput(menu_name); 
        menu_order = mysqlSanitizeInput(menu_order); 
        menu_image = mysqlSanitizeInput(menu_image); 
        menu_link = mysqlSanitizeInput(menu_link); 
        standalone = mysqlSanitizeInput(standalone); 
        status = mysqlSanitizeInput(status); 
        menu_display_inside = mysqlSanitizeInput(menu_display_inside);             

    return `INSERT INTO menu_items(
        menu_id,
        menu_name,
        menu_order,
        menu_image,
        menu_link,
        standalone,
        status,
        menu_display_inside)
        VALUES(
        ${menu_id},
        ${menu_name},
        ${menu_order},
        ${menu_image},
        ${menu_link},
        ${standalone},
        ${status},
        ${menu_display_inside}
        );`;
};
