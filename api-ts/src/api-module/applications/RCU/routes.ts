import LoanCollectionRouter from './loan-collections/routes';
import RetailReportRouter from './RetailReports/routes';

export default class RCURouter {

  loanCollectionRouter: any;
  retailReportRouter: any;

  constructor() {
    this.loanCollectionRouter = new LoanCollectionRouter();
    this.retailReportRouter = new RetailReportRouter();
  }

  setupRouter(app, jwt) {
    this.loanCollectionRouter.setupRouter(app, jwt);
    this.retailReportRouter.setupRouter(app, jwt);
  }
}
