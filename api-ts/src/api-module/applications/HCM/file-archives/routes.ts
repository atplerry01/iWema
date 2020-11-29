import { getFileManagerRequests, getPendingRequests, GiveOutFile, ReturnFile, updateArchiveBox, updateArchiveFiles } from "./routes/Archivist";
import { getCheckRequestLogs, postRequestApproval } from "./routes/Checker";
import { createUserRequest, getArchiveFileLogs, getArchiveFiles, getUserRequestLogs } from "./routes/UserRequest";

export default class FileManagerRouter {
  setupRouter(app, jwt) {
    
    // User Sections
    app.get("/api/v1/hcm/user/request-log", (req, res) => {
      getUserRequestLogs(req, res, jwt);
    });
    
    app.post("/api/v1/hcm/user/create-request", (req, res) => {
      createUserRequest(req, res, jwt);
    });

    // TODO:
    app.get("/api/v1/hcm/file-archives", (req, res) => {
      getArchiveFiles(req, res, jwt);
    });

    app.get("/api/v1/hcm/file-archivelogs", (req, res) => {
      getArchiveFileLogs(req, res, jwt);
    });


    ////////


    // Checker 
    app.get("/api/v1/hcm/checker/request-log", (req, res) => {
      getCheckRequestLogs(req, res, jwt);
    });

    app.post("/api/v1/hcm/checker/request-approval", (req, res) => {
      postRequestApproval(req, res, jwt);
    });



    // Archivist

    app.get("/api/v1/hcm/file-manager/request", (req, res) => {
      getFileManagerRequests(req, res, jwt);
    });

    app.post("/api/v1/hcm/file-manager/update-box", (req, res) => {
      updateArchiveBox(req, res, jwt);
    });

    app.post("/api/v1/hcm/file-manager/update-archive", (req, res) => {
      updateArchiveFiles(req, res, jwt);
    });

    app.get("/api/v1/hcm/archivist/request-log", (req, res) => {
      getPendingRequests(req, res, jwt);
    });

    app.post("/api/v1/hcm/archivist/giveout-file", (req, res) => {
      GiveOutFile(req, res, jwt);
    });

    app.post("/api/v1/hcm/archivist/return-file", (req, res) => {
      ReturnFile(req, res, jwt);
    });


  }
}
