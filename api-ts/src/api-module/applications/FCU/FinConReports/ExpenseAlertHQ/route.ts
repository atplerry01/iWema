import * as _ from "lodash";
import { isAuthenticated } from '../../../../../util/isAuthenticated';
import { Paginator } from './../../../../../util/utility';
import { getHQDivisionService, getHQDivisionUnitService, getHQExpenseAlertService } from './service';

export const getHQDivisionRoutes = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 150);
      const _export = _.get(req.query, "_export", 0);

      try {
        const entity = await getHQDivisionService();
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

export const getHQDivisionUnitRoutes = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 150);
      const division = _.get(req.query, "division");

      try {
        const entity = await getHQDivisionUnitService(division);
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

export const getHQExpenseAlertRoutes = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      const reportCode = _.get(req.query, "reportCode");
      const startDate = _.get(req.query, "startDate");
      const endDate = _.get(req.query, "endDate");

      // // const _forceRemote = _.get(req.query, "forceRefresh", false);
      const _export = _.get(req.query, "_export", 0);

      try {
        const entity = await getHQExpenseAlertService(reportCode, startDate, endDate);
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
