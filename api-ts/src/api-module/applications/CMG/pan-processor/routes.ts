import { createPANProcessor } from "./processor/route";

export default class PANProcessorRouter {
  setupRouter(app, jwt) {
    
    app.post("/api/v1/createPANProcessor", (req, res) => {
      createPANProcessor(req, res, jwt);
    });
  }
}
