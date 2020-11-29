import MICRReportRouter from "./MICRReports/routes";

export default class MICRRouter {
  MICRReportRouter: any;

  constructor() {
    this.MICRReportRouter = new MICRReportRouter();
  }

  setupRouter(app, jwt) {
    this.MICRReportRouter.setupRouter(app, jwt);
  }
}
