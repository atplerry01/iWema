import * as _ from "lodash";
import * as moment from 'moment';
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { Paginator } from "../../../../../util/utility";
import { getSystemTraceService } from "./service";

export const getTraceRoutes = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      const hasAccount = _.get(req.query, "hasAccount", false);
      const hasDateRange = _.get(req.query, "hasDateRange", false);
      const accountNumber = _.get(req.query, "accountNumber");
      let startDate = _.get(req.query, "startDate");
      let endDate = _.get(req.query, "endDate");

      // // const _forceRemote = _.get(req.query, "forceRefresh", false);
      const _export = _.get(req.query, "_export", 0);

      try {
        if (hasDateRange) {
          startDate = moment(startDate).format('YYYY-MM-DD hh:mm:ss');
          endDate = moment(endDate).format('YYYY-MM-DD hh:mm:ss');
        }

        const entity = await getSystemTraceService(hasAccount, hasDateRange, accountNumber, startDate, endDate);
        const result = await Paginator(entity, page, per_page);

        if (_export === "1" || _export === 1) {
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
