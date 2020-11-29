import * as _ from "lodash";
import { ErrorHandler } from "../../../../../util/errorHandler";
import { MakerCheckerPermission } from "../Shared/MakerCheckerPermission";
import { isAuthenticated } from "./../../../../../util/isAuthenticated";
import { logMessage, Paginator } from "./../../../../../util/utility";
import { getLoans } from "./service";

export const getLoansRoute = (req, res, jwt) => {

  isAuthenticated(req, jwt).then(async (decoded_token: any) => {
      const type = _.get(req.query, "type");
      const start = _.get(req.query, "start");
      const end = _.get(req.query, "end");
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
     // const _export = _.get(req.query, "_export", 0);
      const phoneNumber = _.get(req.query, "phoneNumber");
     
      const {sAMAccountName} = decoded_token.data;
      const { accessLevels } = decoded_token;
  
  
       await MakerCheckerPermission(req, res, sAMAccountName, accessLevels, "getLoans");

      const dbdata = await getLoans(type, start, end, phoneNumber);

      const result = await Paginator(dbdata, page, per_page);

      logMessage(req, decoded_token.data.sAMAccountName, 'getLoans', JSON.stringify(req.query), 'SUCCESS');

      return res.status(200).json({
        data: result
      });
    })
    .catch(err => {
        const handleErr = ErrorHandler(req,  '', "getLoans", 'Session Expired. Logout and Login again.', err, false);      
        return res.status(401).json(handleErr);
    });
};
