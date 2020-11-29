import { getOpeningBalance, postBalance } from "./fx-blotter/route";
import { getTopDepositorDownloads, getTopDepositors } from "./top-depositors/route";
import { getUnrealizedTransactions } from "./unrealised-transaction/route";

export default class TreasuryReportRouter {
    setupRouter(app, jwt) {
      app.get("/api/v1/top-depositors/reports", (req, res) => {
        getTopDepositors(req, res, jwt);
      });

      app.get("/api/v1/top-depositors/download", (req, res) => {
        getTopDepositorDownloads(req, res, jwt);
      });

      app.get("/api/v1/unrealized-transaction/reports", (req, res) => {
        getUnrealizedTransactions(req, res, jwt);
      });

      app.get("/api/v1/fx-blotter/getOpeningBal", (req, res) => {
        getOpeningBalance(req, res, jwt);
      });

      app.post("/api/v1/fx-blotter/postFxBalance", (req, res) => {
        postBalance(req, res, jwt);
      });
    }
}
