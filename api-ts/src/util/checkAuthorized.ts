import { ErrorHandler } from "./errorHandler";
import { isAuthenticated } from "./isAuthenticated";
import { checkAccess } from "./utility";

interface IProps {
  methodname: string; 
  accessname: string | string[]; 
  fromBody: boolean;
}

export const checkAuthorized = (req, res, jwt, expectedReq: IProps) => {

  isAuthenticated(req, jwt).then(async (decoded_token: any) => {
     
    const { accessLevels } = decoded_token;

    try {
      const level = await checkAccess(expectedReq.accessname, accessLevels );
      return res.status(200).json(level);
    } catch (error) {
      const handleErr = ErrorHandler(req, decoded_token.data.sAMAccountName, expectedReq.methodname, 'unauthorized user', error, expectedReq.fromBody);
      return res.status(403).json(handleErr); 
    }

  })
  .catch(error => {
    const handleErr = ErrorHandler(req, '', expectedReq.methodname, 'unauthenticated user', error, true);
    return res.status(401).json(handleErr); 
  });

};
