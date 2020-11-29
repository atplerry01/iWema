import LoanMonitoryRouter from './LoanMonitoring/routes';

export default class LRURouter {

    loanMonitoryRouter: any;

  constructor() {
    this.loanMonitoryRouter = new LoanMonitoryRouter();
  }

  setupRouter(app, jwt) {
    this.loanMonitoryRouter.setupRouter(app, jwt);
  }
}
