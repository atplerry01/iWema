import EmployeeAttestationRouter from "./employee_attestation/routes";

export default class HRRouter {

  employeeAttestationRouter: any;
  constructor() {
    this.employeeAttestationRouter = new EmployeeAttestationRouter();
  }

    setupRouter(app, jwt) {

      this.employeeAttestationRouter.setupRouter(app, jwt);
      
      
          // --------------------------------------------------------------------------
          // --   @endpoint: /api/v1/delete_menu_subs/:submenu_id      ----------------
          // --   @method: DELETE                                      ----------------
          // --------------------------------------------------------------------------
      
          // app.delete("/api/v1/delete_menu_subs/:submenu_id", (req, res, _next) => {
          //   delete_menu_subsRouter(req, res, jwt);
          // });
      
        
    }
}
