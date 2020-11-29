import { checkAttestationRouter } from "./check_attestation/route";
import { attestateRouter } from "./attestate/route";
import { AttestateReportRouter } from "./report/route";

export default class EmployeeAttestationRouter {

    setupRouter(app, jwt) {
       
          // -------------------------------------------------------------------------------
          // --   @endpoint: /api/v1/checkattestation                       ----------------
          // --   @method: GET                                              ----------------
          // -------------------------------------------------------------------------------    
          app.get("/api/v1/checkattestation", (req, res) => {
            checkAttestationRouter(req, res, jwt);
          });

          // -------------------------------------------------------------------------------
          // --   @endpoint: /api/v1/attestate                              ----------------
          // --   @method: POST                                             ----------------
          // -------------------------------------------------------------------------------    
          app.post("/api/v1/attestate", async (req, res, _next) => {
            attestateRouter(req, res, jwt);
          });
          
          // ---------------------------------------------------------------------------------
          // --   @endpoint: /api/v1/attestatereport?page=1&per_page=50&_export=0   ----------
          // --   @method: GET                                                      ----------
          // ---------------------------------------------------------------------------------    
          app.get("/api/v1/attestatereport", (req, res) => {
            AttestateReportRouter(req, res, jwt);
          });


    }
}
