import { auditreportsRouter } from "./auditreports/route";
import { get_auditedTransactionsSearchRouter } from "./get_auditedTransactionsSearch/route";
import { get_auditProcessTypeRouter } from "./get_auditProcessType/route";
import { get_auditTransactionInformationReportRouter } from "./get_auditTransactionInformationReport/route";
import { post_auditTransactionInformationRouter } from "./post_auditTransactionInformation/route";


export default class AuditRouter {

    setupRouter(app, jwt) {

      //    * @endpoint: /api/v1/get_auditProcessType
          app.get("/api/v1/get_auditProcessType", (req, res, _next) => {
            get_auditProcessTypeRouter(req, res, jwt);
          });
      

          //    @endpoint: /api/v1/get_auditTransactionInformationReport
          app.get( "/api/v1/get_auditTransactionInformationReport", (req, res, _next) => {
            get_auditTransactionInformationReportRouter(req, res, jwt);
            });
      
          // ------------------------------------------------------------
          // --   @endpoint: /api/v1/post_auditTransactionInformation ----
          // --   @method: POST                           ----------------
          // -------------------------------------------------------------      
          app.post("/api/v1/post_auditTransactionInformation", (req, res, _next) => {
            post_auditTransactionInformationRouter(req, res, jwt);
          });
      
          //    * @endpoint: /api/v1/get_auditedTransactionsSearch?transactionType=&AccountNo=&startdate=&enddate=
          app.get("/api/v1/get_auditedTransactionsSearch", (req, res, _next) => {
            get_auditedTransactionsSearchRouter(req, res, jwt);
          });
      
          app.post("/api/v1/auditreports", (req, res, _next) => {
            auditreportsRouter(req, res, jwt);
          });
    }
}
