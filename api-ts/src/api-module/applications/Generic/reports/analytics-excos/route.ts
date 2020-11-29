import * as _ from "lodash";
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { getAnalyticExcoService, getAnalyticPageService } from "./service";

export const getAnalyticsExco = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const email = _.get(req.query, "email");

      try {
        const entity = await getAnalyticExcoService(email);
        const analyticsPage = await getAnalyticPageService();

        if (entity[0] && analyticsPage[0]) {
          return res.status(200).json({
            error: false,
            data: entity[0],
            analyticsPage: analyticsPage[0]
          });
        } else {
          return res.status(200).json({
            error: true,
            data: 'No record found'
          });
        }
        
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    })
    .catch(err => {
      return res.status(400).json({
        data: err
      });
    });
};
