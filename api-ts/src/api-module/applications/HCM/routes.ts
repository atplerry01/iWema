import FileManagerRouter from './file-archives/routes';

export default class HCMRouter {

  fileManagerRouter: any;

  constructor() {
    this.fileManagerRouter = new FileManagerRouter();
  }

  setupRouter(app, jwt) {
    this.fileManagerRouter.setupRouter(app, jwt);
  }
}
