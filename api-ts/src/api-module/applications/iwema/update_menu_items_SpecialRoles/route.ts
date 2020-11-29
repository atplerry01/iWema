import * as _ from 'lodash';
import { logMessage } from '../../../../util/utility';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { update_menu_items_SpecialRoles } from './service';

export const update_menu_items_SpecialRolesRouter = (req, res, jwt) => {
      isAuthenticated(req, jwt)
      .then((decoded_token: any) => {
          const idno = _.get(req.params, "idno");
          const userid = _.get(req.body, "userid");
          const submenu_id = _.get(req.body, "submenu_id");
          const access_level_id = _.get(req.body, "access_level_id");
          const status = _.get(req.body, "status", "N");

          const accessLevels = decoded_token.accessLevels;

          update_menu_items_SpecialRoles(
              idno,
              userid,
              submenu_id,
              access_level_id,
              status,
              accessLevels
            )
            .then(report => {
              logMessage(
                req,
                decoded_token.data.sAMAccountName,
                "update_menu_items_SpecialRoles",
                JSON.stringify(req.body),
                "N/A"
              );
              return res.status(200).json(report);
            })
            .catch(err => {
              logMessage(
                req,
                decoded_token.data.sAMAccountName,
                "update_menu_items_SpecialRoles",
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
