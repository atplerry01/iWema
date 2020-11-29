import * as _ from 'lodash';
import { logMessage } from '../../../../../util/utility';
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { get_obsoletecar_bidreport_totalbids } from './service';

export const get_obsoletecar_bidreport_totalbidsRouter = (req, res, jwt) => {
      isAuthenticated(req, jwt)
      .then((decoded_token: any) => {
          // const {data: {grade, sn}, accessLevels} = decoded_token;
          const { accessLevels } = decoded_token;

          get_obsoletecar_bidreport_totalbids(accessLevels)
            .then(report => {
              // this.application.get_obsoletecar_bid(allAccess, page, per_page).then((report) => {
              return res.status(200).json(report);
            })
            .catch(err => {
              logMessage(
                req,
                decoded_token.data.sAMAccountName,
                "get_obsoletecar_bidreport_totalbids",
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
