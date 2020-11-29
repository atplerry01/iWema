import * as _ from "lodash";
import { isAuthenticated } from '../../../../../util/isAuthenticated';
import { Paginator } from '../../../../../util/utility';
import { getAccountMandateService } from './service';

export const getAccountMandateRoutes = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      const serviceType = _.get(req.query, "serviceType");
      const selectedBranch = _.get(req.query, "selectedBranch");
      const selectedProduct = _.get(req.query, "selectedProduct");
      const startDate = _.get(req.query, "startDate");
      const endDate = _.get(req.query, "endDate");
      // const _forceRemote = _.get(req.query, "forceRefresh", false);
      const _export = _.get(req.query, "_export", 0);

      // const key = `${'getAccountMandateRoutes'}&${serviceType}&${selectedBranch}&${selectedProduct}&${startDate}&${endDate}&${page}&${per_page}`;
      // const getFromCatch = await redis.get(key);
                  
      // if (getFromCatch && !forceRemote) {
      //   console.log('from cache........');
      //   const data = JSON.parse(getFromCatch);
      //   const result = await Paginator(data, page, per_page);

      //   if (_export === 1) {
      //     return res.status(200).json({
      //       data: result
      //     });
      //   }

      //   return res.status(200).json({
      //     data: result
      //   });
      // }

      try {
        const entity = await getAccountMandateService(serviceType, selectedBranch, selectedProduct, startDate, endDate);
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
