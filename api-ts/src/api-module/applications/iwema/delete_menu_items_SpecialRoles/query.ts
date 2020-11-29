import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const delete_menu_items_SpecialRoles_QUERY = (idno: number) => {
    idno = mysqlSanitizeInput(idno); 
    return `DELETE FROM menu_special_access  WHERE idno = ${idno}`;
};
