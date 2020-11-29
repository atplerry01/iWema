import { deletePolicyNotifications, deleteRegulationNotifications, getAllPolicyNotification, getAllRegulationNotification, getAuditTrails, getFrequency, getPolicyDepartments, getPolicyNotificationById, getRegulationNotificationById, postDepartments, postFrequency, postPolicyNotifications, postRegulationNotifications, updatePolicyNotifications, updateRegulationNotifications } from "./Lookups/route";
import { deletePoliciesRoute, getMgtrRoutes, postPolicies, updatePoliciesRoute } from "./MgtRPolicies/route";
import { deleteByDeptPoliciesRoute, fileUpload, getMgtrByDeptRoutes, postByDeptPolicies, updateByDeptPoliciesRoute } from "./MgtRPoliciesByDepartment/route";
import { getPolicyArchiveRoutes, postPolicyArchiveRoutes } from "./MgtrPoliciesFileArchive/route";
import { deleteRegulationsRoute, getRegulationsRoute, postRegulationsRoute, updateRegulationsRoute } from "./MgtrRegulation/routes";

export default class MgtReportRouter {
  setupRouter(app, jwt) {
    
    // For Policies Reports
    app.get("/api/v1/mgtr/get-policies", (req, res) => {
      getMgtrRoutes(req, res, jwt);
    });

    app.post("/api/v1/mgtr/post-policies", (req, res) => {
      postPolicies(req, res, jwt);
    });

    app.post("/api/v1/mgtr/post-policies/update", (req, res) => {
      updatePoliciesRoute(req, res, jwt);
    });

    app.post("/api/v1/mgtr/post-policies/delete", (req, res) => {
      deletePoliciesRoute(req, res, jwt);
    });

    // GetPoliciesByDepartment
    app.get("/api/v1/mgtr/get-policies-by-department", (req, res) => {
      getMgtrByDeptRoutes(req, res, jwt);
    });

    app.post("/api/v1/mgtr/post-policies-by-department", (req, res) => {
      postByDeptPolicies(req, res, jwt);
    });

    app.post("/api/v1/mgtr/post-policies-by-department/update", (req, res) => {
      updateByDeptPoliciesRoute(req, res, jwt);
    });

    app.post("/api/v1/mgtr/post-policies-by-department/delete", (req, res) => {
      deleteByDeptPoliciesRoute(req, res, jwt);
    });

    //// Regulations
    app.get("/api/v1/mgtr/getRegulations", (req, res) => {
      getRegulationsRoute(req, res, jwt);
    });

    app.post("/api/v1/mgtr/postRegulations", (req, res) => {
      postRegulationsRoute(req, res, jwt);
    });

    app.post("/api/v1/mgtr/updateRegulations", (req, res) => {
      updateRegulationsRoute(req, res, jwt);
    });

    app.post("/api/v1/mgtr/deleteRegulations", (req, res) => {
      deleteRegulationsRoute(req, res, jwt);
    });

    //
    //


    app.post("/api/v1/mgtr/post-policies/file-upload/up", (req, res) => {
      fileUpload(req, res, jwt);
    });

    // FileArchives
    app.get("/api/v1/mgtr/getPolicyArchiveRoutes", (req, res) => {
      getPolicyArchiveRoutes(req, res, jwt);
    });

    app.post("/api/v1/mgtr/postPolicyArchiveRoutes", (req, res) => {
      postPolicyArchiveRoutes(req, res, jwt);
    });

    // Lookups
    // ======================
    app.get("/api/v1/mgtr/lookups/policy/Notifications", (req, res) => {
      getAllPolicyNotification(req, res, jwt);
    });

    app.get("/api/v1/mgtr/lookups/policy/notificationsById", (req, res) => {
      getPolicyNotificationById(req, res, jwt);
    });

    app.post("/api/v1/mgtr/lookups/policy/createNotification", (req, res) => {
      postPolicyNotifications(req, res, jwt);
    });

    app.post("/api/v1/mgtr/lookups/policy/updateNotification", (req, res) => {
      updatePolicyNotifications(req, res, jwt);
    });

    app.post("/api/v1/mgtr/lookups/policy/deleteNotification", (req, res) => {
      deletePolicyNotifications(req, res, jwt);
    });

    /////////////////
    // Regulations
    app.get("/api/v1/mgtr/lookups/regulation/Notifications", (req, res) => {
      getAllRegulationNotification(req, res, jwt);
    });

    app.get("/api/v1/mgtr/lookups/regulation/notificationsById", (req, res) => {
      getRegulationNotificationById(req, res, jwt);
    });

    app.post("/api/v1/mgtr/lookups/regulation/createNotification", (req, res) => {
      postRegulationNotifications(req, res, jwt);
    });

    app.post("/api/v1/mgtr/lookups/regulation/updateNotification", (req, res) => {
      updateRegulationNotifications(req, res, jwt);
    });

    app.post("/api/v1/mgtr/lookups/regulation/deleteNotification", (req, res) => {
      deleteRegulationNotifications(req, res, jwt);
    });

    ////////////////////

    app.get("/api/v1/mgtr/lookups/departments", (req, res) => {
      getPolicyDepartments(req, res, jwt);
    });

    app.post("/api/v1/mgtr/lookups/postDepartments", (req, res) => {
      postDepartments(req, res, jwt);
    });

    app.get("/api/v1/mgtr/lookups/getFrequency", (req, res) => {
      getFrequency(req, res, jwt);
    });

    app.post("/api/v1/mgtr/lookups/postFrequency", (req, res) => {
      postFrequency(req, res, jwt);
    });

    //// Audit Trail
    app.get("/api/v1/mgtr/lookups/audit", (req, res) => {
      getAuditTrails(req, res, jwt);
    });

  }
}
