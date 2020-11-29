import { getFreezeAccountRoutes } from "./freeze-account/route";
import { getLienAccountRoutes } from "./lien-account/route";
import { getRegulatoryLimitRoutes } from "./regulatory-limit/route";
import { getRestrictedAccountRoutes } from "./restricted-account/route";

//  getFinLiveRoutes

export default class ALATReportRouter {
  setupRouter(app, jwt) {
    app.get("/api/v1/alat/regulatory-limit/reports", (req, res) => {
      getRegulatoryLimitRoutes(req, res, jwt);
    });

    app.get("/api/v1/alat/restricted-account/reports", (req, res) => {
      getRestrictedAccountRoutes(req, res, jwt);
    });

    app.get("/api/v1/alat/account-lien/reports", (req, res) => {
      getLienAccountRoutes(req, res, jwt);
    });

    app.get("/api/v1/alat/account-freeze/reports", (req, res) => {
      getFreezeAccountRoutes(req, res, jwt);
    });
  }
}
