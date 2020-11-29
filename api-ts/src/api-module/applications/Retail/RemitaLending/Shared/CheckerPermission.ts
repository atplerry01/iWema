import { ErrorHandler } from "../../../../../util/errorHandler";
import { checkAccess } from "../../../../../util/utility";

export const checkerPermission = async (req, res, username, accessLevels: object) => {
    try {
        const level = await checkAccess("Authorize Remita Lending", accessLevels );

        if (level !== "C") {
          const handleErr = ErrorHandler(req, username, "RemitaLending_CreateLoan", 'Access Denied. Unauthorized User', null, true);
          return res.status(401).json(handleErr);
        }
      } catch (error) {
        const handleErr = ErrorHandler(req,  username, "RemitaLending_CreateLoan", 'Access Denied. Unauthorized User', error, true);
        return res.status(400).json(handleErr);
      }
}