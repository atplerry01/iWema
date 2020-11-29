import FileUploadRouter from "./file-upload/routes";
import ReportsRouter from "./reports/routes";

export default class GenericRouter {
    fileUploadRouter: FileUploadRouter;
    reportsRouter: ReportsRouter;

    constructor() {
        this.fileUploadRouter = new FileUploadRouter();
        this.reportsRouter = new ReportsRouter();
    }

    setupRouter(app, jwt) {
        this.fileUploadRouter.setupRouter(app, jwt);
        this.reportsRouter.setupRouter(app, jwt);
    }
}
