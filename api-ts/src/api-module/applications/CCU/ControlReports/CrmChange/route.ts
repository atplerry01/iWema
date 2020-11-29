import * as _ from "lodash";
import { isAuthenticated } from '../../../../../util/isAuthenticated';
import { Paginator } from '../../../../../util/utility';
import { getCRMChangeService } from './service';

export const getCRMChangeRoute = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
      const endDate = _.get(req.query, "endDate"); // TODO: EndDate

      //#region SecurityChecks
      // const { accessLevels } = decoded_token;

      // try {
      //   await checkAccess("RC-Loan Followup Manager", accessLevels);
      // } catch (error) {
      //   logMessage(
      //     req,
      //     decoded_token.data.sAMAccountName,
      //     "getFollowUpManagerCaseCollections",
      //     JSON.stringify(req.body),

      //     JSON.stringify(error)
      //   );
      //   return res.status(401).json({ err: null, message: "Access Denied. Unauthorized User" });
      // }
      //#endregion

      try {
        const entity = await getCRMChangeService(endDate);
        const result = await Paginator(entity, page, per_page);

        return res.status(200).json({
          data: result
        });
      } catch (err) {
        return res.status(400).json({ error: err });
      }
    })
    .catch(err => {
      return res.status(400).json({
        data: err
      });
    });
};
