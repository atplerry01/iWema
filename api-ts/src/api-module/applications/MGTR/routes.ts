import MgtReportRouter from "./MgtReports/routes";

export default class MGTRRouter {
  mgtReportRouter: any;

  constructor() {
    this.mgtReportRouter = new MgtReportRouter();
  }

  setupRouter(app, jwt) {
    this.mgtReportRouter.setupRouter(app, jwt);
  }
}
