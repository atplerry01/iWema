import { getFieldCaseCollections, postFieldCloseCaseActions } from "./routes/FieldCollector";
import { createAgent, getFollowUpManagerCaseCloseCollections, getFollowUpManagerCaseCollections, getNewCaseCollections, postManagerCloseCaseActions } from "./routes/FollowUpManager";
import { getAllZoneXs, getLookUps } from "./routes/Lookups";
import { getTeleCaseCollections, postCloseCaseActions, postEscalateCaseActions } from "./routes/TeleCollector";
import { getTeleManagerCaseCloseCollections, getTeleManagerCaseCollections, postTeleManagerCloseCaseActions, postTeleManagerEscalateCaseActions, postTeleManagerReAssignCaseActions } from "./routes/TeleManager";
import { createCaseCustomerDetail, createCaseFollowUpHistory, getAgentByEmail, getAgentCollector, getAvailableAgentCollector, getCaseActionLogs, getCaseCustomerDetail, getCaseFollowUpDetail, getLoanDetails } from "./shared/route";


export default class LoanCollectionRouter {
  setupRouter(app, jwt) {
    
    // // Generic
    app.get("/api/v1/getLoanDetails", (req, res) => {
      getLoanDetails(req, res, jwt);
    });



    // //#region Loan FollowUpManager
    
    // // Manager
    app.get("/api/v1/manager/new-loans", (req, res) => {
      getNewCaseCollections(req, res, jwt);
    });

    app.get("/api/v1/manager/loanCollections", (req, res) => {
      getFollowUpManagerCaseCollections(req, res, jwt);
    });

    app.get("/api/v1/manager/closed-case", (req, res) => {
      getFollowUpManagerCaseCloseCollections(req, res, jwt);
    });



    // // POST
    app.post("/api/v1/manager/close-case", (req, res) => {
      postManagerCloseCaseActions(req, res, jwt);
    });

    // app.post("/api/v1/manager/reassign-case", (req, res) => {
    //   postManagerReAssignCaseActions(req, res, jwt);
    // });

    app.post("/api/v1/manager/create-agent", (req, res) => {
      createAgent(req, res, jwt);
    });


    // Tele Manager Section
    app.get("/api/v1/tele-manager/loanCollections", (req, res) => {
      getTeleManagerCaseCollections(req, res, jwt);
    });
    
    app.get("/api/v1/tele-manager/closed-cases", (req, res) => {
      getTeleManagerCaseCloseCollections(req, res, jwt);
    });

    // // POST
    app.post("/api/v1/tele-manager/escalate-case", (req, res) => {
      postTeleManagerEscalateCaseActions(req, res, jwt);
    });

    app.post("/api/v1/tele-manager/close-case", (req, res) => {
      postTeleManagerCloseCaseActions(req, res, jwt);
    });
    
    app.post("/api/v1/tele-manager/reassignment", (req, res) => {
      postTeleManagerReAssignCaseActions(req, res, jwt);
    });

    // //#endregion

    // //#region Tele Agent
    app.get("/api/v1/tele-collector/loanCollections", (req, res) => {
      getTeleCaseCollections(req, res, jwt);
    });

    // // POST
    app.post("/api/v1/tele-collector/close-case", (req, res) => {
      postCloseCaseActions(req, res, jwt);
    });

    app.post("/api/v1/tele-collector/escalate-case", (req, res) => {
      postEscalateCaseActions(req, res, jwt);
    });

    // //#endregion

    // //#region Field Agent
    app.get("/api/v1/field-collector/loanCollections", (req, res) => {
      getFieldCaseCollections(req, res, jwt);
    });

    // // POST
    app.post("/api/v1/field-collector/close-case", (req, res) => {
      postFieldCloseCaseActions(req, res, jwt);
    });

    // app.post("/api/v1/field-collector/escalate-case", (req, res) => {
    //   postFieldEscalatedCaseActions(req, res, jwt);
    // });

    // //#endregion

    // //#region CaseFollowDetail
    app.get("/api/v1/getCaseFollowUpHistory", (req, res) => {
      getCaseFollowUpDetail(req, res, jwt);
    });

    app.post("/api/v1/createCaseFollowUpHistory", (req, res) => {
      createCaseFollowUpHistory(req, res, jwt);
    });

    // // CaseActionLogs
    app.get("/api/v1/getCaseActionLogs", (req, res) => {
      getCaseActionLogs(req, res, jwt);
    });

    // // Customer Details
    app.get("/api/v1/getCaseCustomerDetail", (req, res) => {
      getCaseCustomerDetail(req, res, jwt);
    });

    app.post("/api/v1/createCaseCustomerDetail", (req, res) => {
      createCaseCustomerDetail(req, res, jwt);
    });

    // //#endregion

    app.get("/api/v1/getAgentByEmail", (req, res) => {
      getAgentByEmail(req, res, jwt);
    });

    app.get("/api/v1/getAgentCollector", (req, res) => {
      getAgentCollector(req, res, jwt);
    });

    app.get("/api/v1/getAvailableAgentCollector", (req, res) => {
      getAvailableAgentCollector(req, res, jwt);
    });

    app.get("/api/v1/getLookUps", (req, res) => {
      getLookUps(req, res, jwt);
    });

    // // getAllZoneXs
    app.get("/api/v1/lookup/getZones", (req, res) => {
      getAllZoneXs(req, res, jwt);
    });
    // // 
  }
}
