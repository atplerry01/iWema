import * as _ from 'lodash';
import { logMessage } from '../../../../../util/utility';
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { bid_obsolete_cars } from './service';

export const add_bidRouter = (req, res, jwt) => {
    isAuthenticated(req, jwt)
    .then((decoded_token: any) => {
        const {
          data: { grade, mail, company, department, branch, displayName }
        } = decoded_token;

        const { obsoleteCarId, amount } = req.body;

        bid_obsolete_cars(
            mail,
            company,
            obsoleteCarId,
            amount,
            grade,
            displayName,
            department + "|" + branch
          )
          .then(report => {
            return res.status(200).json(report);
          })
          .catch(err => {
            logMessage(
              req,
              decoded_token.data.sAMAccountName,
              "add_menu_items_SpecialRoles",
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
