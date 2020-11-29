import { getAnalyticsExco } from "./analytics-excos/route";
import { getDQIReport, getDQIZones } from "./dqi/route";

export default class ReportsRouter {
  setupRouter(app, jwt) {

    app.get("/api/v1/analytics/exco", (req, res) => {
      getAnalyticsExco(req, res, jwt);
    });

    app.get("/api/v1/report/dqi", (req, res) => {
      getDQIReport(req, res, jwt);
    });

    app.get("/api/v1/report/dqi/zones", (req, res) => {
      getDQIZones(req, res, jwt);
    });

  }
}
