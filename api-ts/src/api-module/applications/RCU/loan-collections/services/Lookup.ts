import { getConnection } from 'typeorm';
import { LookUp } from './../../../../../entity/RCU/LoanCollection/LookUp';

export const getLookupServices = async (Category) => {
    return await LookUp.find({ Category });
};

export const getAllLookupServices = async () => {
    return await LookUp.find({
        select: ["Id", "Name", "Category"]
    });
};

export const getAllZones = async () => {
    return new Promise(async (resolve, reject) => {
        try {
            const z = `select distinct(zone) from Retail.loan_agent UNION select distinct(zone) from Retail.loan_case`;
            const zones = await getConnection().query(z);
            return resolve(zones);
        } catch (err) {
            return reject({ err, message: "No favourite link found" });
        }
    });
};
