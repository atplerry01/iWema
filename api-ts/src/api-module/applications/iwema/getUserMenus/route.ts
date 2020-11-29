import { ErrorHandler } from "../../../../util/errorHandler";
import { isAuthenticated } from "../../../../util/isAuthenticated";
import { getUserMenus } from "./service";

export const getUserMenusRouter = (app: any, req, res, jwt) => {
    isAuthenticated(req, jwt).then((decoded_token: any) => {
        //  console.log('decoded_token:', decoded_token);

          getUserMenus(app, decoded_token.data.company)
          .then(report => {
            // decoded_token.data.company===Staff ID
            return res.status(200).json(report);
          })
          .catch(error => {
            const handleErr = ErrorHandler(req, decoded_token.data.sAMAccountName, 'getUserMenus',  'Could not retrieve user menus', error, false);
            return res.status(400).json(handleErr);
          });
      })
      .catch(error => {
        const handleErr = ErrorHandler(req, '', 'getUserMenus',  'Authentication failed.', error, false);
        return res.status(401).json(handleErr);
      });
  };
