import * as _ from 'lodash';
import { logMessage } from '../../../../util/utility';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { delete_role } from './service';

export const delete_roleRouter = (req, res, jwt) => {
    isAuthenticated(req, jwt)
      .then((decoded_token: any) => {
        const roleid = _.get(req.params, "roleid");

        const accessLevels = decoded_token.accessLevels;

        delete_role(roleid, accessLevels)
          .then(report => {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "delete_role",
              JSON.stringify(req.body),
              "N/A"
            );
            return res.status(200).json(report);
          })
          .catch(err => {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "delete_role",
              JSON.stringify(req.body),
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
