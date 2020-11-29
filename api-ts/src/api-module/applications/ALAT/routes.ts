import ALATReportRouter from "./reports/report-routes";

export default class ALATRouter {
  ALATReportRouter: any;

  constructor() {
    this.ALATReportRouter = new ALATReportRouter();
  }

  setupRouter(app, jwt) {
    this.ALATReportRouter.setupRouter(app, jwt);
  }
}
