import { getAutopayRoutes } from "./autopay/route";
import { ebillsServiceRoute } from "./ebills/route";
import { NIPInbranchRoute } from "./nip-inBranch/route";
import { getOnUsRoutes } from "./onUs/route";
import { getPayDirectRoutes } from "./paydirect/route";
import { revpayRoutes } from "./revpay/route";
import { getUssdTransRoutes } from "./ussd-trans/route";
import { getTraceRoutes } from "./system-trace/route";

export default class ITUReportRouter {
  setupRouter(app, jwt) {
    app.get("/api/v1/itu/reports/ussd-trans", (req, res) => {
      getUssdTransRoutes(req, res, jwt);
    });

    app.get("/api/v1/itu/reports/paydirect", (req, res) => {
      getPayDirectRoutes(req, res, jwt);
    });

    app.get("/api/v1/itu/reports/autopay", (req, res) => {
      getAutopayRoutes(req, res, jwt);
    });

    app.get("/api/v1/itu/reports/on-us", (req, res) => {
      getOnUsRoutes(req, res, jwt);
    });

    app.get("/api/v1/itu/reports/revpay", (req, res) => {
      revpayRoutes(req, res, jwt);
    });

    app.get("/api/v1/itu/reports/nip", (req, res) => {
      NIPInbranchRoute(req, res, jwt);
    });

    app.get("/api/v1/itu/reports/ebills", (req, res) => {
      ebillsServiceRoute(req, res, jwt);
    });

    app.get("/api/v1/itu/reports/trace", (req, res) => {
      getTraceRoutes(req, res, jwt);
    });
  }
}
