import * as _ from "lodash";
import { isAuthenticated } from '../../../../../util/isAuthenticated';
import { Paginator } from './../../../../../util/utility';
import { getPartLiquidationLogsService, getPartLiquidationService } from './service';

export const getPartLiquidationRoutes = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
    
      const startDate = _.get(req.query, "startDate");
      const endDate = _.get(req.query, "endDate");

      // // const _forceRemote = _.get(req.query, "forceRefresh", false);
      const _export = _.get(req.query, "_export", 0);

      try {
        const entity = await getPartLiquidationService(startDate, endDate);
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

export const getPartLiquidationLogsRoutes = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      const entityId = _.get(req.query, "entityId");
      const accountNo = _.get(req.query, "accountNo");

      try {
        const entity = await getPartLiquidationLogsService(entityId, accountNo);
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