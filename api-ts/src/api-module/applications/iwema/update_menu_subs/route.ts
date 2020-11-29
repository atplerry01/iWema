import * as _ from 'lodash';
import { logMessage } from '../../../../util/utility';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { update_menu_subs } from './service';

export const update_menu_subsRouter = (req, res, jwt) => {
    isAuthenticated(req, jwt)
      .then((decoded_token: any) => {
        const submenu_id = _.get(req.params, "submenu_id");
        const menu_id = _.get(req.body, "menu_id");
        const submenu_name = _.get(req.body, "submenu_name");
        const submenu_link = _.get(req.body, "submenu_link");
        const submenu_display_inside = _.get(
          req.body,
          "submenu_display_inside"
        );
        const submenu_order = _.get(req.body, "submenu_order", 50);
        const favourite_status = _.get(req.body, "favourite_status", "N");
        const favourite_order = _.get(req.body, "favourite_order", null);
        const status = _.get(req.body, "status", "N");

        const accessLevels = decoded_token.accessLevels;

        update_menu_subs(
            submenu_id,
            menu_id,
            submenu_name,
            submenu_link,
            submenu_display_inside,
            submenu_order,
            favourite_status,
            favourite_order,
            status,
            accessLevels
          )
          .then(report => {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "update_menu_subs",
              JSON.stringify(req.body),
              "N/A"
            );
            return res.status(200).json(report);
          })
          .catch(err => {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "update_menu_subs",
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
