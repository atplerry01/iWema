import { executeFinacleLiveQuery } from "../../../../../db/dbUtil";
import { getDQIReportByBranchQuery, getDQIReportByZoneQuery, getDQIReportQuery, getZoneQuery } from "./query";

export const getDQIReportService = async (startDate, reportType, reportValue): Promise<any> => {
  try {

    let q = '';

    if (reportType === 'zone') {
      q = getDQIReportByZoneQuery(startDate, reportValue);
    } else if (reportType === 'branch') {
      q = getDQIReportByBranchQuery(startDate, reportValue);
    } else {
      q = getDQIReportQuery(startDate);
    }

    console.log(q);
    
    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};

export const getDQIZoneService = async (): Promise<any> => {
  try {
    let q = getZoneQuery();

    const result = await executeFinacleLiveQuery(q);
    return result as any;
  } catch (e) {
    return e;
  }
};

