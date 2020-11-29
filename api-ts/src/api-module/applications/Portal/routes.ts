import PortalReportRouter from "./Portal/routes";

export default class PortalRouter {
  PortalReportRouter: any;

  constructor() {
    this.PortalReportRouter = new PortalReportRouter();
  }

  setupRouter(app, jwt) {
    this.PortalReportRouter.setupRouter(app, jwt);
  }
}
