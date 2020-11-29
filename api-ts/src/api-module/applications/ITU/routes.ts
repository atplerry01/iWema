import DowntimeRouter from "./downtime/routes";
import ITUReportRouter from "./ITUReports/routes";

export default class ITURouter {

  downtimeRouter: any;
  ituReportRouter: any;

  constructor() {
    this.downtimeRouter = new DowntimeRouter();
    this.ituReportRouter = new ITUReportRouter();
  }

  setupRouter(app, jwt) {
    this.downtimeRouter.setupRouter(app, jwt);
    this.ituReportRouter.setupRouter(app, jwt);
  }
}
