import INUReportRouter from "./reports/report-routes";

export default class INURouter {
  INUReportRouter: any;

  constructor() {
    this.INUReportRouter = new INUReportRouter();
  }

  setupRouter(app, jwt) {
    this.INUReportRouter.setupRouter(app, jwt);
  }
}
