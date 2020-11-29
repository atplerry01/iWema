import { add_menu_itemRouter } from "./add_menu_item/route";
import { add_menu_items_RolesRouter } from "./add_menu_items_Roles/route";
import { add_menu_items_SpecialRolesRouter } from "./add_menu_items_SpecialRoles/route";
import { add_menu_subsRouter } from "./add_menu_subs/route";
import { add_roleRouter } from "./add_role/route";
import { delete_menu_itemRouter } from "./delete_menu_item/route";
import { delete_menu_items_RolesRouter } from "./delete_menu_items_Roles/route";
import { delete_menu_items_SpecialRolesRouter } from "./delete_menu_items_SpecialRoles/route";
import { delete_menu_subsRouter } from "./delete_menu_subs/route";
import { delete_roleRouter } from "./delete_role/route";
import { emailRouter } from "./email/route";
import { getfavouritelinksRouter } from "./getfavouritelinks/route";
import { getUserMenusRouter } from "./getUserMenus/route";
import { menusRouter } from "./menus/route";
import { rolesRouter } from "./roles/route";
import { submenurolesRouter } from "./submenuroles/route";
import { submenusRouter } from "./submenus/route";
import { update_menu_itemRouter } from "./update_menu_item/route";
import { update_menu_items_RolesRouter } from "./update_menu_items_Roles/route";
import { update_menu_items_SpecialRolesRouter } from "./update_menu_items_SpecialRoles/route";
import { update_menu_subsRouter } from "./update_menu_subs/route";
import { update_roleRouter } from "./update_role/route";

export default class IwemaRouter {

    setupRouter(app, jwt) {
       
        app.get("/api/v1/getUserMenus", (req, res) => {
            getUserMenusRouter(app, req, res, jwt);
          });

          //  * @endpoint: /api/v1/getfavouritelinks
          app.get("/api/v1/getfavouritelinks", (req, res) => {
            getfavouritelinksRouter(req, res, jwt);
          });

          //    * to export data only, change export=1
          //  * @endpoint: /api/v1/menus?name=&page=1&per_page=100
          app.get("/api/v1/menus", (req, res) => {
            menusRouter(req, res, jwt);
          });
      
          //    * to export data only, change export=1
          //    * @endpoint: /api/v1/submenus?menu_id=M001&name=&page=1&per_page=100
          app.get("/api/v1/submenus", (req, res) => {
            submenusRouter(req, res, jwt);
          });
      
          //  @endpoint: /api/v1/roles?id=      
          app.get("/api/v1/roles", (req, res) => {
            rolesRouter(req, res, jwt);
          });
      

          //      * to export data only, change export=1
          //    * @endpoint: /api/v1/submenuroles/SB002      
          app.get("/api/v1/submenuroles/:id", (req, res) => {
            submenurolesRouter(req, res, jwt);
          });
      
          // ------------------------------------------------------------
          // --   @endpoint: /api/v1/add_menu_item       ----------------
          // --   @method: POST                          ----------------
          // ------------------------------------------------------------
      
          app.post("/api/v1/add_menu_item", (req, res) => {
            add_menu_itemRouter(req, res, jwt);
          });
      
          // ------------------------------------------------------------------
          // --   @endpoint: /api/v1/update_menu_item/:idno    ----------------
          // --   @method: PUT                                 ----------------
          // ------------------------------------------------------------------
      
          app.put("/api/v1/update_menu_item/:idno", (req, res) => {
            update_menu_itemRouter(req, res, jwt);
          });
      
          // --------------------------------------------------------------------
          // --   @endpoint: /api/v1/delete_menu_item/:idno      ----------------
          // --   @method: DELETE                                ----------------
          // --------------------------------------------------------------------
      
          app.delete("/api/v1/delete_menu_item/:idno", (req, res) => {
            delete_menu_itemRouter(req, res, jwt);
          });
      
          // ------------------------------------------------------------
          // --   @endpoint: /api/v1/add_menu_subs       ----------------
          // --   @method: POST                          ----------------
          // ------------------------------------------------------------
      
          app.post("/api/v1/add_menu_subs", (req, res, _next) => {
            add_menu_subsRouter(req, res, jwt);
          });
      
          // ------------------------------------------------------------------------
          // --   @endpoint: /api/v1/update_menu_subs/:submenu_id    ----------------
          // --   @method: PUT                                       ----------------
          // ------------------------------------------------------------------------
      
          app.put("/api/v1/update_menu_subs/:submenu_id", (req, res, _next) => {
            update_menu_subsRouter(req, res, jwt);
          });
      
          // --------------------------------------------------------------------------
          // --   @endpoint: /api/v1/delete_menu_subs/:submenu_id      ----------------
          // --   @method: DELETE                                      ----------------
          // --------------------------------------------------------------------------
      
          app.delete("/api/v1/delete_menu_subs/:submenu_id", (req, res, _next) => {
            delete_menu_subsRouter(req, res, jwt);
          });
      
          // ------------------------------------------------------------
          // --   @endpoint: /api/v1/add_role            ----------------
          // --   @method: POST                          ----------------
          // ------------------------------------------------------------
      
          app.post("/api/v1/add_role", (req, res, _next) => {
            add_roleRouter(req, res, jwt);
          });
      
          // ------------------------------------------------------------------------
          // --   @endpoint: /api/v1/update_role/:roleid             ----------------
          // --   @method: PUT                                       ----------------
          // ------------------------------------------------------------------------
      
          app.put("/api/v1/update_role/:roleid", (req, res, _next) => {
            update_roleRouter(req, res, jwt);
          });
      
          // --------------------------------------------------------------------------
          // --   @endpoint: /api/v1/delete_role/:roleid               ----------------
          // --   @method: DELETE                                      ----------------
          // --------------------------------------------------------------------------
      
          app.delete("/api/v1/delete_role/:roleid", (req, res, _next) => {
            delete_roleRouter(req, res, jwt);
          });
      
          // ----------------------------------------------------------------
          // --   @endpoint: /api/v1/add_menu_items_Roles    ----------------
          // --   @method: POST                              ----------------
          // ----------------------------------------------------------------      
          app.post("/api/v1/add_menu_items_Roles", (req, res, _next) => {
            add_menu_items_RolesRouter(req, res, jwt);
          });
      
          // ---------------------------------------------------------------------------
          // --   @endpoint: /api/v1/update_menu_items_Roles/:idno      ----------------
          // --   @method: PUT                                       -------------------
          // ---------------------------------------------------------------------------      
          app.put("/api/v1/update_menu_items_Roles/:idno", (req, res) => {
            update_menu_items_RolesRouter(req, res, jwt);
          });
      
          // --------------------------------------------------------------------------------
          // --   @endpoint: /api/v1/delete_menu_items_Roles/:idno     ----------------
          // --   @method: DELETE                                            ----------------
          // --------------------------------------------------------------------------------
      
          app.delete("/api/v1/delete_menu_items_Roles/:idno", (req, res, _next) => {
            delete_menu_items_RolesRouter(req, res, jwt);
          });
      
          // ------------------------------------------------------------------------
          // --   @endpoint: /api/v1/add_menu_items_SpecialRoles     ----------------
          // --   @method: POST                                      ----------------
          // ------------------------------------------------------------------------
      
          app.post("/api/v1/add_menu_items_SpecialRoles", (req, res, _next) => {
            add_menu_items_SpecialRolesRouter(req, res, jwt);
          });
      
          // ---------------------------------------------------------------------------
          // --   @endpoint: /api/v1/update_menu_items_SpecialRoles/:idno   ----------------
          // --   @method: PUT                                              ---------------
          // ------------------------------------------------------------------------------
      
          app.put("/api/v1/update_menu_items_SpecialRoles/:idno", (req, res, _next) => {
            update_menu_items_SpecialRolesRouter(req, res, jwt);
            });
      
          // ---------------------------------------------------------------------------------
          // --   @endpoint: /api/v1/delete_menu_items_SpecialRoles/:idno     ----------------
          // --   @method: DELETE                                             ----------------
          // ---------------------------------------------------------------------------------      
          app.delete("/api/v1/delete_menu_items_SpecialRoles/:idno", (req, res, _next) => {
            delete_menu_items_SpecialRolesRouter(req, res, jwt);
            });
      

          app.post("/api/v1/email", async (req, res, _next) => {
            emailRouter(req, res);
          });
 
    }
}
