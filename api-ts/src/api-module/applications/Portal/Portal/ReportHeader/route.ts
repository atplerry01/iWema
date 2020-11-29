import * as _ from "lodash";
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { getReportHeaderService } from "./service";

export const getReportHeaderRoutes = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const reportName = _.get(req.query, "reportName");

      try {
        const entity = await getReportHeaderService(reportName);

        if (entity.length > 0) {

          return res.status(200).json({
            data: entity[0]
          });
        } else {
          return res.status(400).json({ error: 'No record found' });
        }
      
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    })
    .catch(err => {
      console.log(err);
      return res.status(400).json({
        data: err
      });
    });
};
