import { getAccountMandateRoutes } from "./AccountMandate/route";
import { getAccReactivationRoute } from "./AccountReactivation/route";
import { getCRMChangeRoute } from "./CrmChange/route";
import { getFixedDepositRouter } from "./FixedDeposit/route";
import { getPartLiquidationLogsRoutes, getPartLiquidationRoutes } from "./PartLiquidation/route";
import { getRiskAssetRouter } from "./RiskAssets/route";

export default class ControlReportRouter {
  setupRouter(app, jwt) {

    // Mandate Reports
    app.get("/api/v1/control/mandate/reports", (req, res) => {
      getAccountMandateRoutes(req, res, jwt);
    });

    // AccReactivation Reports
    app.get("/api/v1/control/acc-reactivation/reports", (req, res) => {
      getAccReactivationRoute(req, res, jwt);
    });

    // AccReactivation Reports
    app.get("/api/v1/control/crm-change/reports", (req, res) => {
      getCRMChangeRoute(req, res, jwt);
    });

    // FixedDeposit Reports
    app.get("/api/v1/control/fixed-deposit/reports", (req, res) => {
      getFixedDepositRouter(req, res, jwt);
    });

    // Risk Reports
    app.get("/api/v1/control/risk-assets/reports", (req, res) => {
      getRiskAssetRouter(req, res, jwt);
    });

    // PartLiquadation
    app.get("/api/v1/control/part-liquidation/reports", (req, res) => {
      getPartLiquidationRoutes(req, res, jwt);
    });

    app.get("/api/v1/control/part-liquidation-logs/reports", (req, res) => {
      getPartLiquidationLogsRoutes(req, res, jwt);
    });

  }
}
