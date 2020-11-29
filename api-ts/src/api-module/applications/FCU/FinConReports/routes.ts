import { getExpenseAlertRoutes } from "./ExpenseAlert/route";
import { getHQDivisionRoutes, getHQDivisionUnitRoutes, getHQExpenseAlertRoutes } from "./ExpenseAlertHQ/route";

export default class FinConReportRouter {
  setupRouter(app, jwt) {

    // Mandate Reports
    app.get("/api/v1/fincon/reports/expense-alert", (req, res) => {
      getExpenseAlertRoutes(req, res, jwt);
    });

    // HQ Report
    app.get("/api/v1/fincon/reports/hq-divisions", (req, res) => {
      getHQDivisionRoutes(req, res, jwt);
    });

    app.get("/api/v1/fincon/reports/hq-divisions-units", (req, res) => {
      getHQDivisionUnitRoutes(req, res, jwt);
    });

    app.get("/api/v1/fincon/reports/hq-expense-alert", (req, res) => {
      getHQExpenseAlertRoutes(req, res, jwt);
    });

  }
}
