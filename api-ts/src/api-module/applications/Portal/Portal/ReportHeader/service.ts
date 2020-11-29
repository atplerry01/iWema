import "reflect-metadata";
import { getConnection } from "typeorm";

export const getReportHeaderService = async (reportName): Promise<any> => {
  return new Promise(async (resolve, reject) => {
    try {

      let q = `SELECT Id, Items, ReportName FROM wema360.ReportHeader where ReportName = '${reportName}'`;

      // tslint:disable-next-line: max-line-length
      const returnLists = await getConnection().query(q);
      return resolve(returnLists);
    } catch (err) {
      return reject({ err, message: "No Record found" });
    }
  });
};
