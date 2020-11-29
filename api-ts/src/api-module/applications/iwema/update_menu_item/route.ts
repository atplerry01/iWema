import * as _ from 'lodash';
import { logMessage } from '../../../../util/utility';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { update_menu_item } from './service';

export const update_menu_itemRouter = (req, res, jwt) => {
    isAuthenticated(req, jwt)
      .then((decoded_token: any) => {
        const idno = _.get(req.params, "idno");
        const menu_name = _.get(req.body, "menu_name");
        const menu_order = _.get(req.body, "menu_order", 50);
        const menu_image = _.get(req.body, "menu_image");
        const menu_link = _.get(req.body, "menu_link");
        const standalone = _.get(req.body, "standalone");
        const status = _.get(req.body, "status", "N");
        const menu_display_inside = _.get(req.body, "menu_display_inside");

        const accessLevels = decoded_token.accessLevels;

        update_menu_item(
            idno,
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
              "update_menu_item",
              JSON.stringify(req.body),
              "N/A"
            );
            return res.status(200).json(report);
          })
          .catch(err => {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "update_menu_item",
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
