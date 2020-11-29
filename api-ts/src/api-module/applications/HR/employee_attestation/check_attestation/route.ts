import * as _ from 'lodash';
import { logMessage } from '../../../../../util/utility';
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { CheckAttestation } from './service';
import { enableAttestation } from '../../../../../util/config';

export const checkAttestationRouter = (req, res, jwt) => {
        
  if (!enableAttestation) {
    return res.status(200).json({resp: -1});
  }

  isAuthenticated(req, jwt).then( async(decoded_token: any) => {
    
    try {
      const resp = await CheckAttestation(decoded_token.data.company);
      return res.status(200).json({resp});
    } catch (error) {

      logMessage(
        req, decoded_token.data.sAMAccountName, "CheckAttestation", JSON.stringify(req.body), JSON.stringify(error)
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
