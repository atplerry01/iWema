import { getUSSDTranReports } from "./ussd-trans/routes";
import { getUSSDAirtimeReports } from "./ussd-airtime/routes";

//  getFinLiveRoutes

export default class OPSReportRouter {
  setupRouter(app, jwt) {
    app.get("/api/v1/ops/ussd-trans/reports", (req, res) => {
      getUSSDTranReports(req, res, jwt);
    });

    app.get("/api/v1/ops/ussd-airtime/reports", (req, res) => {
      getUSSDAirtimeReports(req, res, jwt);
    });

  }
}
