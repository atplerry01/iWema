import { getInfoShareRoutes } from "./infoShare/route";

export default class MICRReportRouter {
  setupRouter(app, jwt) {
    //Mandate Reports
    app.get("/api/v1/micr/reports/infoshare", (req, res) => {
      getInfoShareRoutes(req, res, jwt);
    });
  }
}
