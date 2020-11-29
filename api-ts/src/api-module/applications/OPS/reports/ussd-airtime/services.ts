import { executeSQLServer } from './../../../../../db/dbUtil';
import { getDateRangeQuery, getReportDateFailedQuery, getReportDateReverseQuery, getReportDateSuccessQuery, getReportTextFailedQuery, getReportTextReverseQuery, getReportTextSuccessQuery, getSearchAllQuery, getSearchTextQuery } from './query';

export const getUSSDAirtimeService = async (searchType, reportType, dateFrom, dateTo, searchText, searchText2): Promise<any> => {
  try {

    let sqlResult: any = [];

    let q: any = '';

    if (searchType === 'reportOnly') {
      // if (reportType === 'Success') {
      //   q = getReportSuccessQuery();
      // } else if (reportType === 'Failed') {
      //   q = getReportFailedQuery();
      // } else if (reportType === 'Reversed') {
      //   q = getReportReverseQuery();
      // }
      sqlResult = [];
    } else if (searchType === 'reportAndTextOnly') {
      if (reportType === 'Success') {
        q = getReportTextSuccessQuery(searchText, searchText2);
      } else if (reportType === 'Failed') {
        q = getReportTextFailedQuery(searchText, searchText2);
      } else if (reportType === 'Reversed') {
        q = getReportTextReverseQuery(searchText, searchText2);
      }
    } else if (searchType === 'reportAndDateOnly') {

      if (reportType === 'Success') {
        q = getReportDateSuccessQuery(dateFrom, dateTo);
      } else if (reportType === 'Failed') {
        q = getReportDateFailedQuery(dateFrom, dateTo);
      } else if (reportType === 'Reversed') {
        q = getReportDateReverseQuery(dateFrom, dateTo);
      }
    } else if (searchType === 'dateRangeOnly') {
      q = getDateRangeQuery(dateFrom, dateTo);
    } else if (searchType === 'searchTextOnly') {
      q = getSearchTextQuery(searchText, searchText2);
    } else {
      q = getSearchAllQuery(dateFrom, dateTo, searchText, searchText2);
    }
    
    // q2 = getUssTransByAccountQuery();
    sqlResult = await executeSQLServer(q, {}, 'MobileBanking');

    // // const result = await executeFinacleLiveQuery(q);
    return sqlResult as any;
  } catch (e) {
    return e;
  }
};
