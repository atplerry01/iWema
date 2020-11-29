import * as _ from "lodash";
import { getStatementRenditions } from "../shared/services";
import { isAuthenticated } from "./../../../../../util/isAuthenticated";
import { checkAccess, logMessage, Paginator } from "./../../../../../util/utility";

export const getStatementRenditionsRoute = (req, res, jwt) => {

  isAuthenticated(req, jwt)
    .then(async (decoded_token: any) => {
      const type = _.get(req.query, "type");
      const start = _.get(req.query, "start");
      const end = _.get(req.query, "end");
      const page = _.get(req.query, "page", 1);
      const per_page = _.get(req.query, "per_page", 50);
     // const _export = _.get(req.query, "_export", 0);
      const cif = _.get(req.query, "cif");
      const { accessLevels } = decoded_token;

      try {

        let cnt = 0;
        let passed = false;

        ["SR-Statement Profiling", "SR-Statement Checker"].forEach(async c => {
          const level = await checkAccess(c, accessLevels);
          cnt++;

          if (level === "M" || level === "C") {
            passed = true;
          }

          if (cnt === 2) {
            
            if (!passed) {
              return res.status(401).json({
                err: null,
                message: "Access Denied. Unauthorized User"
              });
            }
          }
        });

      } catch (error) {
        logMessage(
          req,
          decoded_token.data.sAMAccountName,
          "get_statement-rendition",
          JSON.stringify(req.query),
          JSON.stringify(error)
        );
        return res.status(401).json({
          err: null,
          message: "Access Denied. Unauthorized User"
        });
      }

      const branch = ''; // decoded_token.data.branch;

      const dbdata = await getStatementRenditions(type, branch, start, end, cif);

      const result = await Paginator(dbdata, page, per_page);

      return res.status(200).json({
        data: result
      });
    })
    .catch(err => {
      // console.log(err);
      return res.status(400).json({
        data: err
      });
    });
};
