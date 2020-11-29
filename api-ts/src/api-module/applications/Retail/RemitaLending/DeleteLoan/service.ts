import { getConnection } from "typeorm";
import { RemitaLending } from "../../../../../entity/Retail/RemitaLending";

export const deleteLoan = async (id) => {
    
   const result = await getConnection()
    .createQueryBuilder()
    .delete()
    .from(RemitaLending)
    .where("id = :id", { id })
    .execute();

    return result.raw.affectedRows;
};
