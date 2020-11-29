import PANProcessorRouter from "./pan-processor/routes";

export default class CMGRouter {
  panProcessorRouter: PANProcessorRouter;

  constructor() {
    this.panProcessorRouter = new PANProcessorRouter();
  }

  setupRouter(app, jwt) {
    this.panProcessorRouter.setupRouter(app, jwt);
  }

}
