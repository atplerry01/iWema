import { Redis } from "ioredis";
import { getAccountsOpenedRoutes } from "./accountsOpened/route";
import { getAllAccountsRoutes } from "./allAccounts/route";
import { getDormantAccountRoutes } from "./dormantReports/route";

export default class FemaleReportsRouter {
  setupRouter(app, jwt, _redis: Redis) {
    app.get("/api/v1/female-reports/dormant", (req, res) => {
      getDormantAccountRoutes(req, res, jwt);
    });

    app.get("/api/v1/female-reports/opened", (req, res) => {
      getAccountsOpenedRoutes(req, res, jwt);
    });

    app.get("/api/v1/female-reports/all-accounts", (req, res) => {
      getAllAccountsRoutes(req, res, jwt);
    });
  }
}
