import * as _ from 'lodash';
import { logMessage } from '../../../../util/utility';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { delete_menu_items_Roles } from './service';

export const delete_menu_items_RolesRouter = (req, res, jwt) => {
    isAuthenticated(req, jwt)
      .then((decoded_token: any) => {
        const idno = _.get(req.params, "idno");

        const accessLevels = decoded_token.accessLevels;

        delete_menu_items_Roles(idno, accessLevels)
          .then(report => {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "delete_menu_items_Roles",
              JSON.stringify(req.body),
              "N/A"
            );
            return res.status(200).json(report);
          })
          .catch(err => {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "delete_menu_items_Roles",
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
