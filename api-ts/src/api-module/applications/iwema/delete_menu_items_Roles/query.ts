import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const delete_menu_items_Roles_QUERY = (idno: number) => {
    idno = mysqlSanitizeInput(idno); 
    return `DELETE FROM menu_role_access WHERE idno = ${idno}`;
};
