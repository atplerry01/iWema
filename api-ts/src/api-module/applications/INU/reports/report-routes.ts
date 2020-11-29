import { getAlatDocRoutes } from "./alat-doc/route";
import { getAlatGoalRoutes } from "./alat-goal/route";
import { getAlatTransRoutes } from "./alat-trans/route";
import { getGeneralInfoRoutes } from "./general/route";
import { getInduceTransactionRoutes } from './induced-transaction/route';
import { getLoanTransRoutes } from './loan-trans/route';
import { getLoanServiceRoutes } from './loan/route';

export default class INUReportRouter {
  setupRouter(app, jwt) {
    app.get("/api/v1/inu/alat-doc/reports", (req, res) => {
      getAlatDocRoutes(req, res, jwt);
    });

    app.get("/api/v1/inu/alat-goal/reports", (req, res) => {
      getAlatGoalRoutes(req, res, jwt);
    });

    app.get("/api/v1/inu/alat-transaction/reports", (req, res) => {
      getAlatTransRoutes(req, res, jwt);
    });

    app.get("/api/v1/inu/general-info/reports", (req, res) => {
      getGeneralInfoRoutes(req, res, jwt);
    });

    app.get("/api/v1/inu/induced-transaction/reports", (req, res) => {
      getInduceTransactionRoutes(req, res, jwt);
    });

    app.get("/api/v1/inu/alat-loan/reports", (req, res) => {
      getLoanServiceRoutes(req, res, jwt);
    });

    app.get("/api/v1/inu/loan-trans/reports", (req, res) => {
      getLoanTransRoutes(req, res, jwt);
    });

  }
}
