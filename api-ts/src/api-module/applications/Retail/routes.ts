import FemaleReportsRouter from "./FemaleReports/routes";
import RemitaLendingRouter from "./RemitaLending/routes";

export default class RetailRouter {

  remitaLendingRouter: any;
  femaleReportsRouter: any;

  constructor() {
    this.remitaLendingRouter = new RemitaLendingRouter();
    this.femaleReportsRouter = new FemaleReportsRouter();
  }

  setupRouter(app, jwt, _redis) {
    this.remitaLendingRouter.setupRouter(app, jwt, _redis);
    this.femaleReportsRouter.setupRouter(app, jwt);
  }
}
