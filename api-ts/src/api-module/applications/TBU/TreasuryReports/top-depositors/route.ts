import * as _ from "lodash";
import { isAuthenticated } from './../../../../../util/isAuthenticated';
import { redis } from './../../../../../util/redis';
import { Paginator } from './../../../../../util/utility';
import { getTopDepositorDetails } from './service';

export const getTopDepositors = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const amount = _.get(req.query, "amount");
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      const _export = _.get(req.query, "_export", 0);

      //#region SecurityChecks
      // const { accessLevels } = decoded_token;

      // try {
      //   await checkAccess("RC-Loan Followup Manager", accessLevels);
      // } catch (error) {
      //   logMessage(
      //     req,
      //     decoded_token.data.sAMAccountName,
      //     "getFollowUpManagerCaseCollections",
      //     JSON.stringify(req.body),

      //     JSON.stringify(error)
      //   );
      //   return res.status(401).json({ err: null, message: "Access Denied. Unauthorized User" });
      // }
      //#endregion

      const key = `${'TreasuryReport_GetTopDepositors'}${amount}&${page}&${per_page}`;
      const getFromCatch = await redis.get(key);
      
      if (getFromCatch && _export !== 1) {
        const data = JSON.parse(getFromCatch);
        const result = await Paginator(data, page, per_page);
        
        // if (_export === 1) {
        //   return res(data);
        // }
        
        return res.status(200).json({
          data: result
        });
      }

      try {
        const entity = await getTopDepositorDetails(amount);
        const result = await Paginator(entity, page, per_page);
        
        // if (_export === 1) {
        //   // return res(entity);
        //   console.log(entity);
        //   return res.status(200).json({
        //     data: entity
        //   });
        // }

        return res.status(200).json({
          data: result
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

export const getTopDepositorDownloads = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const amount = _.get(req.query, "amount");

      try {
        const result = await getTopDepositorDetails(amount);

        return res.status(200).json({
          data: result
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
