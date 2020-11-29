import { getBranchNetworkRouter } from "./getBranchNetwork/route";
import { usersRouter } from "./getUsers/route";
import { meRouter } from "./me/route";
import { searchuserRouter } from "./searchuser/route";
import { getEmployeesByRoleRouter } from "./getEmployeesByRole/route";
import { getEmployeeByStaffNoRouter } from "./getEmployeeByStaffNo/route";
import { getStaffAccouthWithStaffIdRouter } from "./getStaffAccouthWithStaffId/route";
import { getThisMonthCustomerBirthdayByCustomerIDRouter } from "./getThisMonthBODByCustomerID/route";
import { todaybirthdaysCustomersRouter } from "./todaybirthdaysCustomers/route";
import { getTodayBirthay_StaffRouter } from "./getTodayBirthay_Staff/route";
import { totalgradeRouter } from "./totalgrade/route";
import { loginRouter } from "./login/route";
import ConfidentialityRouter from "./confidentiality/routes";
import { logoutRouter } from "./logout/route";


export default class UsersRouter {

    confidentialityRouter: any;
    constructor() {
        this.confidentialityRouter = new ConfidentialityRouter();
    }

    setupRouter(app, jwt) {

        this.confidentialityRouter.setupRouter(app, jwt);

        //  @endpoint: /api/v1/users/login
        app.post('/api/v1/users/login', (req, res) => {
            loginRouter(app, req, res);
        });

          //  @endpoint: /api/v1/users/logout
          app.post('/api/v1/users/logout', (req, res) => {
            logoutRouter(req, res, jwt);
        });


        //  * @endpoint: /api/v1/users/:username
        app.get('/api/v1/users/:username', (req, res, _next) => {
          usersRouter(app, req, res, jwt);
        });

        //   * @endpoint: /api/v1/getBranchNetwork?drilldownLevel=B&code=1223
        app.get('/api/v1/getBranchNetwork', (req, res, _next) => {
            getBranchNetworkRouter(req, res, jwt);
        });


        //  * @endpoint: /api/v1/users/me
        app.get('/api/v1/me', (req, res, _next) => {
            meRouter(req, res, jwt);
        });

        //  * @endpoint: /api/v1/searchuser?searchterm=${searchterm}&regioncode=${regioncode}&zonecode=${zonecode}&branchcode=${branchcode}
        app.get('/api/v1/searchuser', (req, res, _next) => {
            searchuserRouter(req, res, jwt);
        });

        //  * @endpoint: /api/v1/getEmployeesByRole/:roleid
        app.get('/api/v1/getEmployeesByRole/:roleid', (req, res, _next) => {
            getEmployeesByRoleRouter(req, res, jwt);
        });


        //  * @endpoint: /api/v1/getEmployeeByStaffNo/:staffNo
        app.get('/api/v1/getEmployeeByStaffNo/:staffNo', (req, res, _next) => {
            getEmployeeByStaffNoRouter(req, res, jwt);
        });


        //    * @endpoint: /api/v1/getStaffAccouthWithStaffId/:staffNo
        app.get('/api/v1/getStaffAccouthWithStaffId/:staffNo', (req, res, _next) => {
            getStaffAccouthWithStaffIdRouter(req, res, jwt);
        });


        //  @endpoint: /api/v1/getThisMonthCustomerBirthdayByCustomerID/R000215512
        app.get('/api/v1/getThisMonthCustomerBirthdayByCustomerID/:customerid', (req, res, _next) => {
            getThisMonthCustomerBirthdayByCustomerIDRouter(req, res, jwt);
        });

        //   * @endpoint: /api/v1/todaybirthdaysCustomers
        app.get('/api/v1/todaybirthdaysCustomers', (req, res) => {
            todaybirthdaysCustomersRouter(req, res);
        });


        //  * @endpoint: /api/v1/getTodayBirthay_Staff
        app.get('/api/v1/getTodayBirthay_Staff', (req, res, _next) => {
            getTodayBirthay_StaffRouter(req, res);
        });


        //   * @endpoint: /api/v1/totalgrade
        app.get('/api/v1/totalgrade', (_req, res) => {
            totalgradeRouter(res);
        });    


    }
}
