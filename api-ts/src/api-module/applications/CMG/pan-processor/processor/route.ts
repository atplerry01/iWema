import * as _ from "lodash";
import * as workerFarm from "worker-farm"; // used for mult-threading
import { ErrorHandler } from "../../../../../util/errorHandler";
import { isAuthenticated } from "./../../../../../util/isAuthenticated";
import { checkAccess, logMessage } from './../../../../../util/utility';
// import { getPanProcessFromFins } from "./service";


export const createPANProcessor = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (decoded_token: any) => {
      const dataparm = _.get(req.body, "data");
      const { accessLevels } = decoded_token;
      
      try {
        const level = await checkAccess(
          "PAN-Processor",
          accessLevels
        );

        if (level !== "G") {
          return res.status(403).json({
            err: null,
            message: "Access Denied. Unauthorized User"
          });
        }
      } catch (error) {
        logMessage(
          req,
          decoded_token.data.sAMAccountName,
          "createPANProcessor",
          JSON.stringify(req.body),
          JSON.stringify(error)
        );
        return res.status(401).json({
          err: null,
          message: "Access Denied. Unauthorized User"
        });
      }

      try {
       
        // create a new thread for this long running process to avoid blocking all other users request and eventually crashing the app
        const service = workerFarm(require.resolve('./service'));
        service(dataparm, (err, result) => {
          if (err) {
            const handleErr = ErrorHandler(req, '', "createPANProcessor", 'Could not process the record.', err, true);
            workerFarm.end(service);
            return res.status(400).json(handleErr);
          }

          workerFarm.end(service);

          return res.status(200).json({
            data: result
          });

        });

      } catch (err) {
          const handleErr = ErrorHandler(req, '', "createPANProcessor", 'Could not process the record.', err, true);
          return res.status(400).json(handleErr);
      }
    })
    .catch(err => {
        const handleErr = ErrorHandler(req, '', "createPANProcessor", 'Session Expired. Logout and Login again.', err, true);
        return res.status(401).json(handleErr);
    });
};
