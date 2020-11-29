import { getConnection } from "typeorm";
import { SRCifAccount } from "../../../../../entity/CBG/StatementRendition/SRCifAccount";
import { SRCustomerProfile } from "./../../../../../entity/CBG/StatementRendition/SRCustomerProfile";


export const updateStatementRendition = async (entity) => {
    await SRCustomerProfile.save(entity);
};

export const deleteStatementRendition = async (id) => {

    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(SRCifAccount)
    .where("profileId = :id", { id })
    .execute();

    // if (pResult.raw.affectedRows > 0) {

   const result =  await getConnection()
    .createQueryBuilder()
    .delete()
    .from(SRCustomerProfile)
    .where("id = :id", { id })
    .execute();

    return result.raw.affectedRows;
    // }

  //  return 0;

};
