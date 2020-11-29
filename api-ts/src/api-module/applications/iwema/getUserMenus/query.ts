import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const getUserMenus_QUERY = staffId => {
    staffId = mysqlSanitizeInput(staffId);
    return `CALL sp_menu(${staffId})`;
};
