import OPSReportRouter from './reports/report-routes';

export default class OPSRouter {

  opsReportRouter: any;

  constructor() {
    this.opsReportRouter = new OPSReportRouter();
  }

  setupRouter(app, jwt) {
    this.opsReportRouter.setupRouter(app, jwt);
  }
}
