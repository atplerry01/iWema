import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const delete_menu_subs_QUERY = (submenu_id: string) => {
    submenu_id = mysqlSanitizeInput(submenu_id); 
    return `DELETE FROM menu_subs WHERE submenu_id = ${submenu_id};`;
};
