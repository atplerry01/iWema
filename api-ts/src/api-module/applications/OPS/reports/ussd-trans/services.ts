import { executeSQLServer } from './../../../../../db/dbUtil';
import { getAllSearchUssdTransQuery, getAllUssdTransQuery, getDateRangeUssdTransQuery, getTextOnlyUssdTransQuery } from "./query";

export const getUSSDTransService = async (searchType, dateFrom, dateTo, searchText): Promise<any> => {
  try {

    let sqlResult: any = [];

    let q: any = '';

    if (searchType === 'searchAll') {
      // q = `SELECT * FROM wema360.IT_Downtime WHERE  Date BETWEEN '${dateFrom}' AND '${dateTo}' OR Issues LIKE '%${searchText}%' OR ServiceImpacted LIKE '%${searchText}%' OR Responsibility LIKE '%${searchText}%' ORDER BY updatedAt DESC;`;
      q = getAllSearchUssdTransQuery(dateFrom, dateTo, searchText);
    } else if (searchType === 'dateRangeOnly') {
      // q = `SELECT * FROM wema360.IT_Downtime WHERE Date BETWEEN '${dateFrom}' AND '${dateTo}' ORDER BY updatedAt DESC`;
      q = getDateRangeUssdTransQuery(dateFrom, dateTo);
    } else if (searchType === 'searchTextOnly') {
      // q = `SELECT * FROM wema360.IT_Downtime WHERE Issues LIKE '%${searchText}%' OR ServiceImpacted LIKE '%${searchText}%' OR Responsibility LIKE '%${searchText}%' ORDER BY updatedAt DESC;`;
      q = getTextOnlyUssdTransQuery(searchText);
    } else {
      // q = 'SELECT * FROM wema360.IT_Downtime ORDER BY updatedAt DESC';
      q = getAllUssdTransQuery();
    }

    // q2 = getUssTransByAccountQuery();
    sqlResult = await executeSQLServer(q, {}, 'MobileBanking');

    // // const result = await executeFinacleLiveQuery(q);
    return sqlResult as any;
  } catch (e) {
    return e;
  }
};
