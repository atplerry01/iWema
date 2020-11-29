import { getConnection } from "typeorm";


export const CheckAttestation = async (staffId: string) => {
    const result = await getConnection().query(
      `SELECT COUNT(*) total FROM employee_atestation WHERE staffId='${staffId}'`);

      return result[0].total;
  
  };

