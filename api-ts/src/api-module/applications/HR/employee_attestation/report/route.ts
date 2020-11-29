import * as _ from 'lodash';
import { logMessage } from '../../../../../util/utility';
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { AttestateReport } from './service';


export const AttestateReportRouter = (req, res, jwt) => {
        
  isAuthenticated(req, jwt).then( async(decoded_token: any) => {   
   
    try {

      const {page, per_page, _export } = _.get(req, 'query');
      const {accessLevels} = decoded_token;

      const resp = await AttestateReport(accessLevels, Number(_export), Number(page), Number(per_page));
      return res.status(200).json({resp});
    } catch (error) {

      logMessage(
        req, decoded_token.data.sAMAccountName, "AttestateReport", JSON.stringify(req.body), JSON.stringify(error)
      );

      return res.status(400).json({error});
    }


      })
      .catch(err => {
        return res.status(401).json({
          error: err
        });
      });
  };
