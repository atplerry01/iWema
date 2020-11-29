import { ErrorHandler } from "../../../../../util/errorHandler";
import { checkAccess } from "../../../../../util/utility";

export const MakerCheckerPermission = async (req, res, sAMAccountName, accessLevels: object, funcName: string) => {

    try {

        let cnt = 0;
        let passed = false;

        ["Create Remita Lending", "Authorize Remita Lending"].forEach(async c => {
          const level = await checkAccess(c, accessLevels);
          cnt++;

          if (level === "M" || level === "C") {
            passed = true;
          }

          if (cnt === 2) {
            
            if (!passed) {
              return res.status(401).json({
                err: null,
                message: "Access Denied. Unauthorized User"
              });
            }
          }
        });

      } catch (error) {
        const handleErr = ErrorHandler(req,  sAMAccountName, funcName, 'Access Denied. Unauthorized User', error, true);
        return res.status(400).json(handleErr);
      }
};
