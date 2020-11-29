import { fileUpload, getProjectDetails } from "./fileupload/route";

export default class FileUploadRouter {
  setupRouter(app, jwt) {

    app.get("/api/v1/generic/getProjectDetails", (req, res) => {
      getProjectDetails(req, res, jwt);
    });

    app.post("/api/v1/generic/upload-file", (req, res) => {
      fileUpload(req, res, jwt);
    });

  }
}
