import { postPDORecoveryRoute } from "./pdo-recovery/route";
import { getTermDepositRoute } from "./term-deposit/route";

export default class RetailReportRouter {
    setupRouter(app, jwt) {

      app.post("/api/v1/pdo-recovery/reports", (req, res) => {
        postPDORecoveryRoute(req, res, jwt);
      });

      app.get("/api/v1/term-deposit/reports", (req, res) => {
        getTermDepositRoute(req, res, jwt);
      });
    }
}
