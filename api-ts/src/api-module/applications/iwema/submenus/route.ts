import * as _ from 'lodash';
import { ErrorHandler } from '../../../../util/errorHandler';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { get_menu_subs } from './service';

export const submenusRouter = (req, res, jwt: any) => {
    isAuthenticated(req, jwt)
      .then((decoded_token: any) => {
        const _menu_id = _.get(req.query, "menu_id", "");
        const _name = _.get(req.query, "name", "");
        const page = _.get(req.query, "page", 1);
        const per_page = _.get(req.query, "per_page", 100);

        const allAccess = decoded_token.accessLevels;

        get_menu_subs(_menu_id, _name, allAccess, page, per_page)
          .then(report => {
            return res.status(200).json(report);
          })
          .catch(err => {
            const handleErr = ErrorHandler(req, decoded_token.data.sAMAccountName, 'get_menu_subs',  'Could not retrieve sub-menus', err, false);
            return res.status(400).json(handleErr);
          });
      })
      .catch(err => {
        const handleErr = ErrorHandler(req, '', 'get_menu_subs',  'Authentication failed.', err, false);
        return res.status(401).json(handleErr);
      });
  };
