import { mysqlSanitizeInput } from "../../../../db/dbUtil";

export const get_Roles_QUERY = (role_id) => {
    let q =  `                
    SELECT  idno,
    roleid,
    role_name,
    status
        FROM roles
    `;
    if (role_id) {
        q = ` ${q} WHERE roleid = ${mysqlSanitizeInput(role_id )} `;
    }

    return ` ${q} ORDER BY status Desc, role_name `;
};
