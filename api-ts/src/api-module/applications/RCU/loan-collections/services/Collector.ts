import { getConnection } from 'typeorm';
import { constCase } from '../shared/constant';
import { IFinacleLoans } from '../shared/interfaces';
import { getLoanCollectionsQuery } from '../shared/query';
import { executeFinacleLiveQuery } from './../../../../../db/dbUtil';
import { Case } from './../../../../../entity/RCU/LoanCollection/Case';

export const getTeleCloseCases = async (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {
            let q = `Select * from Retail.loan_case where IsAssigned = TRUE and CaseStage = 'Tele Collector' and IsClosed = TRUE`;
            const returnLists = await getConnection().query(q);

            return resolve(returnLists);
        } catch(err) {
            return reject({ err, message: "No Collection Found" });
        }
    });
};

export const getCollectionSevices = async (selectedCase, agentId?: string, queryType?: string, dateRange?: string, searchText?: string): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {

            let q = `Select * from Retail.loan_case `;

            switch (selectedCase) {
                // Generic Section for the Followup Manager
                case constCase.openCases:
                    q = q + ` where IsAssigned = TRUE and IsClosed = False AND IsTreated = FALSE AND IsFlaged = FALSE and MarkEscalated = FALSE and MarkClosed = FALSE`;
                    break;
                case constCase.markClosedCases:
                    q = q + ` where IsAssigned = TRUE and IsClosed = False and MarkClosed = TRUE`;
                    break;
                case constCase.closedCases:
                    q = q + ` where IsAssigned = TRUE and IsClosed = TRUE`;
                    break;
                case constCase.markEscalatedCases:
                    q = q + ` where IsAssigned = TRUE and IsClosed = False and MarkEscalated = true`;
                    break;
                case constCase.flagedCases:
                    q = q + ` where IsAssigned = TRUE and IsClosed = False and IsFlaged = TRUE`;
                    break;

                // TeleCollector Cases
                case constCase.teleCollectorCases:
                    q = q + ` where IsAssigned = TRUE and IsClosed = False AND IsFlaged = FALSE and CaseStage = 'Tele Collector'`;
                    break;

                // FieldCollector Cases
                case constCase.fieldCollectorCases:
                    q = q + ` where IsAssigned = TRUE and IsClosed = False AND IsFlaged = FALSE and CaseStage = 'Field Collector'`;
                    break;

                // Tele Manager Cases // TODO
                case constCase.teleManagerCollectorCases:
                    q = q + ` where IsAssigned = TRUE and IsClosed = False AND IsFlaged = FALSE and CaseStage = 'Tele Collector'`;
                    break;
                case constCase.teleMarkClosedCases:
                    q = q + ` where IsAssigned = TRUE and IsClosed = False and CaseStage = 'Tele Collector' and MarkClosed = TRUE`;
                    break;
                case constCase.teleClosedCases:
                    q = q + ` where IsAssigned = TRUE and CaseStage = 'Tele Collector' and IsClosed = TRUE`;
                    break;
                case constCase.teleMarkEscalatedCases:
                    q = q + ` where IsAssigned = TRUE and IsClosed = False and CaseStage = 'Tele Collector' and MarkEscalated = TRUE`;
                    break;
                case constCase.teleFlagedCases:
                    q = q + ` where IsAssigned = TRUE and IsClosed = False and CaseStage = 'Tele Collector' and IsFlaged = TRUE`;
                    break;

                // Agent Sections
                case constCase.agentOpenCollectorCases:
                    q = q + ` where IsAssigned = TRUE and IsClosed = False AND IsTreated = FALSE AND IsFlaged = FALSE and MarkEscalated = FALSE and MarkClosed = FALSE and AgentId = '${agentId}' `;
                    break;
                case constCase.agentMarkEscalatedCollectorCases:
                    q = q + ` where IsAssigned = TRUE and IsClosed = False and MarkEscalated = TRUE and AgentId = '${agentId}' `;
                    break;
                case constCase.agentMarkClosedCollectorCases:
                    q = q + ` where IsAssigned = TRUE and IsClosed = False and MarkClosed = TRUE and MarkEscalated = FALSE and AgentId = '${agentId}' `;
                    break;
                case constCase.agentClosedCollectorCases:
                    q = q + ` where IsAssigned = TRUE and IsClosed = TRUE and AgentId = '${agentId}' `;
                    break;
                case constCase.agentFlagedCollectorCases:
                    q = q + ` where IsAssigned = TRUE and IsClosed = FALSE AND IsFlaged = TRUE and AgentId = '${agentId}' `;
                    break;
                case constCase.agentTreatedCollectorCases:
                    q = q + ` where IsAssigned = TRUE and IsTreated = TRUE and AgentId = '${agentId}' `;
                    break;
                default:
                    break;
            }

            if (queryType === 'searchAll') {
                q = q + ` AND ${dateRange} OR LoanAccountNumber LIKE  '%${searchText}%' OR OperatingAccNumber LIKE '%${searchText}%' OR AccountName LIKE '%${searchText}%'`;
            } else if (queryType === 'searchTextOnly') {
                q = q + ` AND LoanAccountNumber LIKE  '%${searchText}%' OR OperatingAccNumber LIKE '%${searchText}%' OR AccountName LIKE '%${searchText}%' `;
            } else if (queryType === 'dateRange') {
                q = q + ` AND ${dateRange}`
            }
            
            const returnLists = await getConnection().query(q);

            return resolve(returnLists);
        } catch (err) {
            return reject({ err, message: "No Collection Found" });
        }
    });
};

export const getCaseCollectorByCaseId = async (Id) => {
    return await Case.findOneOrFail(Id);
};

export const getClosedCollectionSevices = async (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
        try {

            const q = `Select * from Retail.loan_case where IsClosed = TRUE `;

            // tslint:disable-next-line: max-line-length
            const returnLists = await getConnection().query(q);
            return resolve(returnLists);
        } catch (err) {
            return reject({ err, message: "No Collection Found" });
        }
    });
};

export const getLoanCollectionsDetails = async (accountNos: string[]): Promise<IFinacleLoans[] | any> => {
    try {
        const q = getLoanCollectionsQuery(accountNos);
        const result = await executeFinacleLiveQuery(q);

        return result as IFinacleLoans[];
    } catch (e) {
        return e;
    }
};

export const updateCaseCollectorService = async (entity) => {
    return await Case.save(entity);
};
