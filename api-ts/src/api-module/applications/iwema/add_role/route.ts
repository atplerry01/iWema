import * as _ from 'lodash';
import { logMessage } from '../../../../util/utility';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { add_role } from './service';

export const add_roleRouter = (req, res, jwt) => {
    isAuthenticated(req, jwt)
      .then((decoded_token: any) => {
        const roleid = _.get(req.body, "roleid");
        const role_name = _.get(req.body, "role_name");
        const status = _.get(req.body, "status", "N");

        const accessLevels = decoded_token.accessLevels;

        add_role(roleid, role_name, status, accessLevels)
          .then(report => {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "add_role",
              JSON.stringify(req.body),
              "N/A"
            );
            return res.status(201).json(report);
          })
          .catch(err => {
           logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "add_role",
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
