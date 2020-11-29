import { getConnection, getRepository } from "typeorm";
import { PolicyRegulation } from "../../../../../entity/MGTR/PolicyRegulation";

export const getRegulationService = async (search): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let q = '';

            if (search === '' || search === undefined) {
                q = `Select * from wema360.PolicyRegulation ORDER by Id desc`;
            } else {
                // tslint:disable-next-line: max-line-length
                q = `SELECT * FROM wema360.PolicyRegulation WHERE Title LIKE '%${search}%' OR Source LIKE '%${search}%' OR Description LIKE '%${search}%' OR RefNumber LIKE '%${search}%' OR ConcernedUnit LIKE '%${search}%' OR PolicyType LIKE '%${search}%' ORDER BY Id desc`;
            }

            const returnLists = await getConnection().query(q);
            return resolve(returnLists);
        } catch (err) {
            return reject({ err, message: "No records found" });
        }
    });
};

export const getRegulationByRefNumberService = async (refNumber) => {
    return new Promise(async (resolve, reject) => {
        try {
            const q = `SELECT * FROM wema360.PolicyRegulation where RefNumber = '${refNumber}' ORDER by Id desc`;
            const entities = await getConnection().query(q);
            return resolve(entities);

        } catch (err) {
            return reject({ err, message: "Something went wrong" });
        }
    });
};

export const postRegulationService = async (entity) => {
    const entityRepository = getRepository(PolicyRegulation);
    return await entityRepository.save(entity);
};

export const updateRegulationService = async (Id, ImplementationDate, Title, Source, Obligation, Description, RefNumber, IssuanceDate, FilePath, RegulatoryReturns, ConcernedUnit, NotificationFrequency, NotificationDayDiff, NotificationLastUpdated, PolicyType): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            // tslint:disable-next-line:max-line-length
            const q = `UPDATE wema360.PolicyRegulation SET Id = '${Id}', ImplementationDate = '${ImplementationDate}', Title = '${Title}', Source = '${Source}', Obligation = '${Obligation}', Description = '${Description}', RefNumber = '${RefNumber}', IssuanceDate = '${IssuanceDate}', FilePath = '${FilePath}', RegulatoryReturns = '${RegulatoryReturns}', ConcernedUnit = '${ConcernedUnit}', NotificationFrequency = '${NotificationFrequency}', NotificationDayDiff = '${NotificationDayDiff}', NotificationLastUpdated = '${NotificationLastUpdated}', PolicyType = '${PolicyType}' WHERE ID = ${Id};`;
            const returnLists = await getConnection().query(q);
            return resolve(returnLists);
        } catch (err) {
            return reject({
                err: err,
                message: "Could Not Complete Request",
            });
        }
    });
};

export const deleteRegulationService = async (id): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            // tslint:disable-next-line:max-line-length
            const q = `DELETE FROM wema360.PolicyRegulation WHERE ID=${id};`;
            const returnLists = await getConnection().query(q);
            return resolve(returnLists);
        } catch (err) {
            return reject({
                err: err,
                message: "Could Not Complete Request",
            });
        }
    });
};
