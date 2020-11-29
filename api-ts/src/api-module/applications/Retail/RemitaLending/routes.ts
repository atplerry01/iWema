import { Redis } from "ioredis";
import { CreateLoanRoute } from "./CreateLoan/route";
import { DeletLoanRoute } from "./DeleteLoan/route";
import { getLoansRoute } from "./GetLoans/routes";
import { GetsalarypaymentHistory } from "./GetsalarypaymentHistory/route";
import { LoanDisburmentNotification } from "./LoanDisburmentNotification/route";
import { StopLoanCollection } from "./StopLoanCollection/route";


export default class RemitaLendingRouter {

  setupRouter(app, jwt, redis: Redis) {
    
    app.get("/api/v1/remitalending_getloans", (req, res) => {
      getLoansRoute(req, res, jwt);
    });

    app.post("/api/v1/remitalending_createloan", (req, res) => {
      CreateLoanRoute(req, res, jwt);
    });

    app.post("/api/v1/remitalending_deleteloan", (req, res) => {
      DeletLoanRoute(req, res, jwt);
    });


    app.get("/api/v1/getsalarypaymentHistory/:id", (req, res) => {
      GetsalarypaymentHistory(req, res, jwt, redis);
    });

    app.post("/api/v1/loanDisburmentNotification", (req, res) => {
      LoanDisburmentNotification(req, res, jwt);
    });

    app.post("/api/v1/stopLoanCollection", (req, res) => {
      StopLoanCollection(req, res, jwt);
    });

  }
}
