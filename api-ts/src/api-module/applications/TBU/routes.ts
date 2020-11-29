import TreasuryReportRouter from './TreasuryReports/routes';

export default class TBURouter {

  treasuryReportRouter: any;

  constructor() {
    this.treasuryReportRouter = new TreasuryReportRouter();
  }

  setupRouter(app, jwt) {
    this.treasuryReportRouter.setupRouter(app, jwt);
  }
}
