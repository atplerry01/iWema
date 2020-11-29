import CBDReportRouter from "./CBDreports/routes";

export default class CBNRouter {
  CBDReportRouter: any;

  constructor() {
    this.CBDReportRouter = new CBDReportRouter();
  }

  setupRouter(app, jwt) {
    this.CBDReportRouter.setupRouter(app, jwt);
  }
}
