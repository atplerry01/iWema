import FinConReportRouter from './FinConReports/routes';

export default class FCURouter {

  finConReportRouter: any;

  constructor() {
    this.finConReportRouter = new FinConReportRouter();
  }

  setupRouter(app, jwt) {
    this.finConReportRouter.setupRouter(app, jwt);
  }
}
