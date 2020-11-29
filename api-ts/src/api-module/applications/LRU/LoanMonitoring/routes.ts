import { getAccountTurnOverCollections } from "./account-turnover/route";
import { getExpiredFacilityCollections } from './expired-facility/route';
import { getFacilityUltilizationCollections } from './facility-ultilization/route';
import { getNewlyDisbursedCollections } from './newly-disbursed/route';
import { getPDOCollections } from './pdo/route';

export default class LoanMonitoryRouter {
    setupRouter(app, jwt) {

      app.get("/api/v1/account-turnover", (req, res) => {
        getAccountTurnOverCollections(req, res, jwt);
      });

      app.get("/api/v1/expired-facility", (req, res) => {
        getExpiredFacilityCollections(req, res, jwt);
      });

      app.get("/api/v1/facility-ultilization", (req, res) => {
        getFacilityUltilizationCollections(req, res, jwt);
      });

      app.get("/api/v1/newly-disbursed", (req, res) => {
        getNewlyDisbursedCollections(req, res, jwt);
      });

      app.get("/api/v1/pdo", (req, res) => {
        getPDOCollections(req, res, jwt);
      });

    }
  }
