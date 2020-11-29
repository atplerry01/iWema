import AMLCFTRiskRouter from './AMLCFTRiskReport/routes';
import ControlReportRouter from './ControlReports/routes';

export default class CCURouter {

  amlCFTRiskRouter: any;
  controlReportRouter: any;

  constructor() {
    this.amlCFTRiskRouter = new AMLCFTRiskRouter();
    this.controlReportRouter = new ControlReportRouter();
  }

  setupRouter(app, jwt) {
    this.amlCFTRiskRouter.setupRouter(app, jwt);
    this.controlReportRouter.setupRouter(app, jwt);
  }
}
