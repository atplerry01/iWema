import { Redis } from "ioredis";
import * as _ from "lodash";
import * as shortid from "shortid";
import { postGetsalarypaymentHistory } from "../../../../../httpService/htttpClient_RemittaLending";
import { ErrorHandler } from "../../../../../util/errorHandler";
import { MakerCheckerPermission } from "../Shared/MakerCheckerPermission";
import { isAuthenticated } from "./../../../../../util/isAuthenticated";
import { isValidPhone } from "./../../../../../util/utility";

export const GetsalarypaymentHistory = (req, res, jwt, redis: Redis) => {
  isAuthenticated(req, jwt).then(async (decoded_token: any) => {
      const PhoneNumber = _.get(req.params, "id");
    
    //  await redis.del(PhoneNumber);

    const {sAMAccountName} = decoded_token.data;
    const { accessLevels } = decoded_token;

      if (!isValidPhone(PhoneNumber)) {
        const err = ErrorHandler(req, sAMAccountName, "GetsalarypaymentHistory", 'Invalid Phone Number', 'Invalid Phone Number', false);      
        return res.status(400).json(err);
      }

     await MakerCheckerPermission(req, res, sAMAccountName, accessLevels, "GetsalarypaymentHistory");


    const fromCatch = await redis.get(PhoneNumber);
    if (fromCatch) {
        return res.status(200).json(JSON.parse(fromCatch));
    }
 
      try {

        const authorisationCode = shortid.generate();
        
      const result = await postGetsalarypaymentHistory({PhoneNumber, authorisationCode});
    //  console.log('result: ', result);
      if (result.Status === '00') {

        const finalResult = { result: JSON.parse(result.Result), authorisationCode };
        try {
            await redis.set(PhoneNumber, JSON.stringify(finalResult), "ex", 60 * 60 * 5); // store f
        } catch (error) {
            console.log('Redis Insert failed:', error.message);
        }

        return res.status(200).json(finalResult);
      }

      const err = ErrorHandler(req, sAMAccountName, "GetsalarypaymentHistory", result.Msg, result, false);      
      return res.status(400).json(err);

    } catch (error) {
      const err = ErrorHandler(req, sAMAccountName, "GetsalarypaymentHistory", 'Salary History Retrieval Failed', error, false);      
      return res.status(400).json(err);        
    }



    })
    .catch(err => {
      const handleErr = ErrorHandler(req,  '', "GetsalarypaymentHistory", 'Session Expired. Logout and Login again.', err, false);      
      return res.status(401).json(handleErr);
    });
};
