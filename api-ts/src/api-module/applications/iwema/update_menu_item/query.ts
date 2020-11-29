import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const update_menu_items_QUERY = (
    idno: number,
    menu_name: string,
    menu_order: number,
    menu_image: string,
    menu_link: string,
    standalone: string,
    status: string,
    menu_display_inside: string
) => {
    idno = mysqlSanitizeInput(idno); 
    menu_name =  mysqlSanitizeInput(menu_name); 
    menu_order =  mysqlSanitizeInput(menu_order); 
    menu_image = menu_image ?  mysqlSanitizeInput(menu_image) : 'null'; 
    menu_link = menu_link ?  mysqlSanitizeInput(menu_link) : 'null'; 
    standalone =  mysqlSanitizeInput(standalone); 
    status =  mysqlSanitizeInput(status); 
    menu_display_inside =  mysqlSanitizeInput(menu_display_inside);           

   return `UPDATE menu_items SET
        menu_name = ${menu_name},
        menu_order =  ${menu_order},menu_image =  ${menu_image},
        menu_link =  ${menu_link},
        standalone = ${standalone},
        status =  ${status},
        menu_display_inside =  ${menu_display_inside}
        WHERE idno = ${idno};`;
};
