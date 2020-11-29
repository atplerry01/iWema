import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const delete_menu_items_QUERY = ( idno: number) => {
    idno = mysqlSanitizeInput(idno); 
    return `DELETE FROM menu_items WHERE idno = ${idno};`;
};
