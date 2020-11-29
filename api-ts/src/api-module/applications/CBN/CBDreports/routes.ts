import { getCorporateBorrowerRoutes } from "./CorporateBorrower/route";
import { getCreditInformationRoutes } from "./CreditInformation/route";
import { getGuarantorInformationRoutes } from "./GuarantorInformation/route";
import { getCorporatePrincipalRoutes } from "./CorporatePrincipalBorrower/route";
import { getIndividualBorrowerRoutes } from "./IndividualBorrower/route";
import { getFinLiveRoutes } from "./FinLive/route";
//  getFinLiveRoutes

export default class CBDReportRouter {
  setupRouter(app, jwt) {
    // CorporateBorrower Reports
    app.get("/api/v1/cbd-reports/corporate-borrower/reports", (req, res) => {
      getCorporateBorrowerRoutes(req, res, jwt);
    });
    //Credit info
    app.get("/api/v1/cbd-reports/credit-information/reports", (req, res) => {
      getCreditInformationRoutes(req, res, jwt);
    });
    //Guarantor info
    app.get("/api/v1/cbd-reports/guarantor-information/reports", (req, res) => {
      getGuarantorInformationRoutes(req, res, jwt);
    });
    //Corporate Principal info
    app.get("/api/v1/cbd-reports/corporate-principal/reports", (req, res) => {
      getCorporatePrincipalRoutes(req, res, jwt);
    });
    //Individual Principal info
    app.get("/api/v1/cbd-reports/individual-borrower/reports", (req, res) => {
      getIndividualBorrowerRoutes(req, res, jwt);
    });
    //Fin live
    app.get("/api/v1/cbd-reports/fin-live", (req, res) => {
      getFinLiveRoutes(req, res, jwt);
    });
  }
}
