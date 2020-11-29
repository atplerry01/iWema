import * as _ from "lodash";
import { sendEmail } from "../../../../../util/sendEmail";
import { getStatementRenditionById } from "../shared/services";
import { isAuthenticated } from "./../../../../../util/isAuthenticated";
import { checkAccess, logMessage } from "./../../../../../util/utility";
import { deleteStatementRendition, updateStatementRendition } from "./service";

export const StatementRenditionDecisionRoute = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (decoded_token: any) => {
      const id = _.get(req.body, "id");
      const comment = _.get(req.body, "comment");
      const type = _.get(req.query, "type");
      const { accessLevels } = decoded_token;

      
      try {
        const level = await checkAccess(
          "SR-Statement Checker",
          accessLevels
        );

        if (level !== "C") {
          return res.status(403).json({
            err: null,
            message: "Access Denied. Unauthorized User"
          });
        }
      } catch (error) {
        logMessage(
          req,
          decoded_token.data.sAMAccountName,
          "update_statement-rendition",
          JSON.stringify(req.body),
          JSON.stringify(error)
        );
        return res.status(401).json({
          err: null,
          message: "Access Denied. Unauthorized User"
        });
      }


      const statement = await getStatementRenditionById(id);
      if (statement) {
        if (type === 'reject') {
        const result = await deleteStatementRendition(id);
        
        if (result && result > 0) {
          logMessage(
            req,
            decoded_token.data.sAMAccountName,
            "deleteStatementRendition",
            JSON.stringify(req.body),
            JSON.stringify(statement)
          );

          sendEmail( decoded_token.data.mail, statement.setupBy, 'Statement rendition profile deleted', 
           'Deleted account statement rendition profile for ' + statement.accountName, 
           `Deleted account statement rendition profile for ${statement.accountName} -> ${statement.accountNumber}`, 
            comment,  decoded_token.data.displayName); 

          return res.status(200).json({
            success: true
          });

        } else {
          return res.status(400).json({
            success: false
          });
        }

        } 
          
        statement.status = type;     
        await updateStatementRendition(statement);
      } else {
        return res.status(400).json({
          error: 'Record not found'
        });
      }
      
      return res.status(200).json({
        logged: true
      });
    })
    .catch(err => {
      return res.status(400).json({
        error: err
      });
    });
};


