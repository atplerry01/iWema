import * as _ from 'lodash';
import { logMessage } from '../../../../util/utility';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { add_menu_item } from './service';

export const add_menu_itemRouter = (req, res, jwt) => {
    isAuthenticated(req, jwt)
      .then((decoded_token: any) => {
        const menu_name = _.get(req.body, "menu_name");
        const menu_order = _.get(req.body, "menu_order", 50);
        const menu_image = _.get(req.body, "menu_image", null);
        const menu_link = _.get(req.body, "menu_link", null);
        const standalone = _.get(req.body, "standalone");
        const status = _.get(req.body, "status", "N");
        const menu_display_inside = _.get(req.body, "menu_display_inside");

        const accessLevels = decoded_token.accessLevels;

        add_menu_item(
            menu_name,
            menu_order,
            menu_image,
            menu_link,
            standalone,
            status,
            menu_display_inside,
            accessLevels
          )
          .then(report => {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "add_menu_item",
              JSON.stringify(req.body),
              "N/A"
            );
            return res.status(201).json(report);
          })
          .catch(err => {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "add_menu_item",
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
