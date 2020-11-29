import * as _ from 'lodash';
import { ErrorHandler } from '../../../../util/errorHandler';
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { get_menu_items } from './service';

export const menusRouter = (req, res, jwt) => {
    isAuthenticated(req, jwt)
      .then((decoded_token: any) => {
        const _name = _.get(req.query, "name", "");
        const page = _.get(req.query, "page", 1);
        const per_page = _.get(req.query, "per_page", 100);

        const allAccess = decoded_token.accessLevels;

        get_menu_items(_name, allAccess, page, per_page)
          .then(report => {
            return res.status(200).json(report);
          })
          .catch(error => {
            const handleErr = ErrorHandler(req, '', 'get_menu_items',  'Could not retrieve user menus list.', error, false);
            return res.status(400).json(handleErr);
          });
      })
      .catch(error => {
        const handleErr = ErrorHandler(req, '', 'get_menu_items',  'Authentication failed.', error, false);
        return res.status(401).json(handleErr);
      });
  };
