import StatementRenditionRouter from './StatementRendition/routes';

export default class CBGRouter {

  statementRenditionRouter: any;

  constructor() {
    this.statementRenditionRouter = new StatementRenditionRouter();
  }

  setupRouter(app, jwt) {
    this.statementRenditionRouter.setupRouter(app, jwt);
  }
}
