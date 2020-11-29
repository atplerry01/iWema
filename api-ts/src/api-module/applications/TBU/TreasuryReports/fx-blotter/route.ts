import * as _ from "lodash";
import { isAuthenticated } from './../../../../../util/isAuthenticated';
import { createFxLogService, getOpeningBalanceSevices } from './service';

// Get Openini Balance
export const getOpeningBalance = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const StartDate = _.get(req.query, "startDate");

      try {
        const entity = await getOpeningBalanceSevices(StartDate);
        // if (entity === undefined) {
        //   const balRes = await createFxLogService();
        // }

        return res.status(200).json({
          data: entity
        });
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

export const postBalance = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const RequestDate = _.get(req.body, "requestDate");
      const OpenBalanceUsd = _.get(req.body, "openBalanceUsd");
      const OpenBalanceNgn = _.get(req.body, "openBalanceNgn");
      const NewRate = _.get(req.body, "newRate");
    
      try {
        await createFxLogService(RequestDate, OpenBalanceUsd, OpenBalanceNgn, NewRate);

        return res.status(200).json({
          data: 'ok'
        });
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
