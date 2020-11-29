import { logMessage } from "./utility";

export const ErrorHandler = (req: any, username: string, methodName: string, errMessage: string, error: any, reqFromBody: boolean) => {

const err = {
    error: null,
    message: errMessage
  };

  const reqbody = reqFromBody ? req.body : req.params ? req.params : req.query;

  logMessage(
    req,
    username,
    methodName,
    JSON.stringify(reqbody),
    JSON.stringify(error)
  );
  

  return { error: err }; 
};
