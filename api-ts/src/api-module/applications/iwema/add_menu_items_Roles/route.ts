import * as _ from 'lodash';
import { logMessage } from '../../../../util/utility';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { add_menu_items_Roles } from './service';

export const add_menu_items_RolesRouter = (req, res, jwt) => {
    isAuthenticated(req, jwt)
      .then((decoded_token: any) => {
        const {roleid, submenu_id, access_level_id, status} = _.get(req, "body");
        const accessLevels = decoded_token.accessLevels;

        add_menu_items_Roles(
            roleid,
            submenu_id,
            access_level_id,
            status,
            accessLevels
          )
          .then(report => {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "add_menu_items_Roles",
              JSON.stringify(req.body),
              "N/A"
            );
            return res.status(201).json(report);
          })
          .catch(err => {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "add_menu_items_Roles",
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
