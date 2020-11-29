import * as _ from 'lodash';
import { logMessage } from '../../../../util/utility';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { get_Roles } from './service';

export const rolesRouter = (req, res, jwt) => {
    isAuthenticated(req, jwt)
      .then((decoded_token: any) => {
        const id = _.get(req.query, "id");

        const allAccess = decoded_token.accessLevels;

        get_Roles(id, allAccess)
          .then(report => {
            return res.status(200).json(report);
          })
          .catch(err => {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "get_Roles",
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
