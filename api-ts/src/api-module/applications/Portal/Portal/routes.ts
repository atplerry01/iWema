import { getReportHeaderRoutes } from "./ReportHeader/route";

export default class PortalReportRouter {
  setupRouter(app, jwt) {
    app.get("/api/v1/portal/reportHeader", (req, res) => {
      getReportHeaderRoutes(req, res, jwt);
    });
  }
}
