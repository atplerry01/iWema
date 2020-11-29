import { getConnection } from "typeorm";
import { checkAccess } from "../../../util/utility";
import { FimiLog } from "../../../entity/FimiLog";
import { FimiTransaction } from "../../../entity/FimiTransaction";


export const get_FIMI = async (type: string, datefrom: string, dateto: string, accessLevels: object, accno?: string) => {

    return new Promise(async (resolve, reject) => {


       try {
            const level = await checkAccess('FIMI Report', accessLevels);
            if (level !== 'G') {
                return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
            }

            const tbl = type === 'l' ? FimiLog : FimiTransaction;
            const where = type === 'l' ? "DATE(logdate) BETWEEN :datefrom AND :dateto" : "DATE(trandate) BETWEEN :datefrom AND :dateto";

            let query = getConnection()
            .getRepository(tbl)
            .createQueryBuilder('f');

                if (datefrom && dateto) {
                    query = query.andWhere(where, {datefrom, dateto}); 
                }            

                if (accno) {
                    query = query.andWhere("accountno = :accno", {accno}); 
                }            

                return resolve(query.getMany());

        } catch (error) {
                return reject({ err: null,  message: "Access Denied. Unauthorized User"  });
        }   

    });
};
