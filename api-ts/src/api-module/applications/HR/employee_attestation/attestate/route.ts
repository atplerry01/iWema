import * as _ from 'lodash';
import { logMessage } from '../../../../../util/utility';
import { isAuthenticated } from "../../../../../util/isAuthenticated";
import { Attestate } from './service';

export const attestateRouter = (req, res, jwt) => {
        
  isAuthenticated(req, jwt).then( async(decoded_token: any) => {
    
    try {
       const {mail, company, displayName} = decoded_token.data;
      const resp = await Attestate(mail, company, displayName);
      return res.status(200).json({resp});
    } catch (error) {

      logMessage(
        req, decoded_token.data.sAMAccountName, "Attestate", JSON.stringify(req.body), JSON.stringify(error)
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
