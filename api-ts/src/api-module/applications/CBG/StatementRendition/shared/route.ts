import * as _ from "lodash";
import { SRCifAccount } from "./../../../../../entity/CBG/StatementRendition/SRCifAccount";
import { isAuthenticated } from "./../../../../../util/isAuthenticated";

export const getRelatedProfiles = (req, res, jwt) => {
  isAuthenticated(req, jwt)
    .then(async (_decoded_token: any) => {
      const profileId = _.get(req.query, "profileId");
      // const { accessLevels } = decoded_token;

      const result = await SRCifAccount.find({ where: { profileId } });
      
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
