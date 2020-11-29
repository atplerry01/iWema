import * as _ from "lodash";
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { Paginator } from "../../../../../util/utility";
import { getUSSDAirtimeService } from "./services";
// import { getUSSDTransService } from "./services";

export const getUSSDAirtimeReports = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      const searchType = _.get(req.query, "searchType");
      const reportType = _.get(req.query, "reportType");
      // reportType
      const dateFrom = _.get(req.query, "dateFrom");
      const dateTo = _.get(req.query, "dateTo");
      const searchText = _.get(req.query, "searchText");
      const searchText2 = _.get(req.query, "searchText2");

      const _export = _.get(req.query, "_export", 0);

      try {
        const entity = await getUSSDAirtimeService(searchType, reportType, dateFrom, dateTo, searchText, searchText2);
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
