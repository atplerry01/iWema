import * as _ from 'lodash';
import { logMessage } from '../../../../../util/utility';
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { get_obsoletecar_bid } from './service';

export const get_obsoletecar_bidRouter = (req, res, jwt) => {
    isAuthenticated(req, jwt)
    .then((decoded_token: any) => {
        const _id = _.get(req.query, "id");
        const page = _.get(req.query, "page", 1);
        const per_page = _.get(req.query, "per_page", 100);
        // const allAccess = decoded_token.accessLevels;

        // const {data: {grade, sn}, accessLevels} = decoded_token;
        const { accessLevels } = decoded_token;
 
          get_obsoletecar_bid(_id, accessLevels, page, per_page)
          .then(report => {
            // this.application.get_obsoletecar_bid(allAccess, page, per_page).then((report) => {
            return res.status(200).json(report);
          })
          .catch(err => {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "get_obsoletecar_bid",
              JSON.stringify(req.query),
              JSON.stringify(err)
            );

            return res.status(400).json({
              error: err
            });
          });
      })
      .catch(err => {
        return res.status(401).json({
          error: err
        });
      });
  };
