import { acceptCodeOfConductDeclarationRouter, acceptCodeOfSafePracticeRouter, acceptConfidentialityDeclarationRouter } from "./acceptConfidentialityDeclaration/route";
import { checkCodeOfConductDeclarationRouter, checkCodeOfSafePracticeRouter, checkConfidentialityDeclarationRouter } from "./checkConfidentialityDeclaration/route";


export default class ConfidentialityRouter {

    setupRouter(app, jwt) {

        //   * @endpoint: /api/v1/getThisMonthCustomerBirthdayByCustomerID/R000215512
        app.get('/api/v1/checkConfidentialityDeclaration', (req, res, _next) => {
            checkConfidentialityDeclarationRouter(req, res, jwt);
        });

        app.post('/api/v1/acceptConfidentialityDeclaration', (req, res, _next) => {
            acceptConfidentialityDeclarationRouter(req, res, jwt);
        });       

        app.get('/api/v1/checkCodeOfConductDeclaration', (req, res, _next) => {
            checkCodeOfConductDeclarationRouter(req, res, jwt);
        });

        app.post('/api/v1/acceptCodeOfConductDeclaration', (req, res, _next) => {
            acceptCodeOfConductDeclarationRouter(req, res, jwt);
        });       

        // CodeOfSafePractice
        app.get('/api/v1/checkCodeOfSafePractice', (req, res, _next) => {
            checkCodeOfSafePracticeRouter(req, res, jwt);
        });

        app.post('/api/v1/acceptCodeOfSafePractice', (req, res, _next) => {
            acceptCodeOfSafePracticeRouter(req, res, jwt);
        });       
    }
}
