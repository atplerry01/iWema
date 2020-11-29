import { createDowntimeRequest, getDowntimeRequest, getTopDowntimeRequest } from "./routes/route";

export default class DowntimeRouter {
    setupRouter(app, jwt) {

        // User Sections
        app.get("/api/v1/itu/downtime", (req, res) => {
            getDowntimeRequest(req, res, jwt);
        });

        // User Sections
        app.get("/api/v1/itu/top-downtime", (req, res) => {
            getTopDowntimeRequest(req, res, jwt);
        });

        app.post("/api/v1/itu/downtime", (req, res) => {
            createDowntimeRequest(req, res, jwt);
        });
    }
}
