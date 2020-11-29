import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const get_menu_subs_QUERY = (menu_id, name) => {
    let q = `            
        SELECT 
        idno,
        submenu_id,
        menu_id,
        submenu_name,
        submenu_link,
        submenu_display_inside,
        submenu_order,
        favourite_status,
        favourite_order,
        status
        FROM menu_subs WHERE menu_id=${ mysqlSanitizeInput(`${ menu_id }`)}`;

        if (name) {
            q = ` ${q}  AND submenu_name LIKE ${ mysqlSanitizeInput(`%${ name }%`) }`;
        }

        q = ` ${q}  ORDER BY idno;`;

        return q;
};
