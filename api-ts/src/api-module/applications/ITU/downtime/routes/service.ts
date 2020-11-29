import { getConnection } from 'typeorm';
import { Downtime } from './../../../../../entity/ITU/Downtime';

export const getDowntimeReportSevices = async (searchType, dateFrom, dateTo, searchText) => {
        
    let q = '';

    if (searchType === 'searchAll') {
        q = `SELECT * FROM wema360.IT_Downtime WHERE  Date BETWEEN '${dateFrom}' AND '${dateTo}' OR Issues LIKE '%${searchText}%' OR ServiceImpacted LIKE '%${searchText}%' OR Responsibility LIKE '%${searchText}%' ORDER BY updatedAt DESC;`;
    } else if (searchType === 'dateRangeOnly') {
        q = `SELECT * FROM wema360.IT_Downtime WHERE Date BETWEEN '${dateFrom}' AND '${dateTo}' ORDER BY updatedAt DESC`;
    } else if (searchType === 'searchTextOnly') {
        q = `SELECT * FROM wema360.IT_Downtime WHERE Issues LIKE '%${searchText}%' OR ServiceImpacted LIKE '%${searchText}%' OR Responsibility LIKE '%${searchText}%' ORDER BY updatedAt DESC;`;
    } else {
        q = 'SELECT * FROM wema360.IT_Downtime ORDER BY updatedAt DESC';
    }

    return new Promise(async (resolve, reject) => {
        try {
            const openBal = await getConnection().query(q);
            return resolve(openBal);
        } catch (err) {
            return reject({ err, message: "No record found" });
        }
    });
};


export const getTopDowntimeReportSevices = async () => {
    
    return new Promise(async (resolve, reject) => {
        try {
            // tslint:disable-next-line: max-line-length
            const openBal = await getConnection().query(`SELECT * FROM wema360.IT_Downtime ORDER BY updatedAt DESC LIMIT 5`);
            return resolve(openBal);
        } catch (err) {
            return reject({ err, message: "No record found" });
        }
    });
};


export const createDowntimeServices = async (entity) => {
    return await Downtime.create(entity).save();
};
