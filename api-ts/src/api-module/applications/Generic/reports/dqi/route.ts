import * as _ from "lodash";
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { Paginator } from "../../../../../util/utility";
import { getDQIReportService, getDQIZoneService } from "./service";

export const getDQIReport = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      const reportType = _.get(req.query, "reportType");
      const reportValue = _.get(req.query, "reportValue");
      const startDate = _.get(req.query, "startDate");
      const _export = _.get(req.query, "_export", 0);

      try {
        console.log('========>', startDate, reportType, reportValue);
        const entity = await getDQIReportService(startDate, reportType, reportValue);
        const result = await Paginator(entity, page, per_page);

                if (_export === '1' || _export === 1) {
                    return res.status(200).json({
                        data: entity
                    });
                }

        return res.status(200).json({
          data: result
        });
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

export const getDQIZones = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50000);

      try {
        const entity = await getDQIZoneService();
        const result = await Paginator(entity, page, per_page);

        return res.status(200).json({
          data: result
        });
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
