import AuditRouter from './audit/routes';
export default class BPRRouter {

  auditRouter: any;
  constructor() {
    this.auditRouter = new AuditRouter();
  }

    setupRouter(app, jwt) {
      this.auditRouter.setupRouter(app, jwt);    
    }
}
