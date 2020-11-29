import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const get_menu_items_QUERY = (name) => {
    let q = `                
            SELECT 
            idno,
            menu_id,
            menu_name,
            menu_order,
            menu_image,
            menu_link,
            standalone,
            status,
            menu_display_inside
            FROM menu_items`;

    if (name) {
        const formattedName =  mysqlSanitizeInput(`%${ name }%`);
        q = ` ${q}  WHERE menu_name LIKE ${ formattedName }`;
    }

    q = ` ${q}  ORDER BY idno;`;

    return q;
};
