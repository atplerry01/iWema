import * as _ from 'lodash';
import { logMessage } from '../../../../../util/utility';
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { get_obsolete_car } from './service';

export const get_obsolete_carRouter = (req, res, jwt) => {
    isAuthenticated(req, jwt)
    .then((decoded_token: any) => {
        // const {data: {grade, sn}, accessLevels} = decoded_token;
        const {
          data: { grade }
        } = decoded_token;

        get_obsolete_car(grade)
          .then(report => {
            return res.status(200).json(report);
          })
          .catch(err => {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "get_obsolete_car",
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
