import { StatementRenditionDecisionRoute } from './approval/route';
import { getSRCustomerAccountsRouter } from './getSRCustomerAccounts/route';
import { getStatementRenditionsRoute } from './reports/route';
import { getRelatedProfiles } from './shared/route';
import { statementProfiling } from './statement-profiling/route';

export default class StatementRenditionRouter {

  setupRouter(app, jwt) {
    
    app.get("/api/v1/get_sr_customer_accounts", (req, res) => {
      getSRCustomerAccountsRouter(req, res, jwt);
    });

    app.get("/api/v1/get_statement-rendition", (req, res) => {
      getStatementRenditionsRoute(req, res, jwt);
    });

    app.get("/api/v1/get_relatedProfiles", (req, res) => {
      getRelatedProfiles(req, res, jwt);
    });

    app.post("/api/v1/post_statement-rendition", (req, res) => {
      statementProfiling(req, res, jwt);
    });

    // Todo
    app.put("/api/v1/approval_statement-rendition", (req, res) => {
      StatementRenditionDecisionRoute(req, res, jwt);
    });

  }
}
