import { get_obsolete_carRouter } from "./get_obsolete_car/route";
import { add_bidRouter } from "./add_bid/route";
import { get_obsoletecar_bidRouter } from "./get_obsoletecar_bid/route";
import { get_obsoletecar_bidreport_totalbidsRouter } from "./get_obsoletecar_bidreport_totalbids/route";



export default class BidObsoleteCarRouter {


    setupRouter(app, jwt) {

          // @endpoint: /api/v1/get_obsolete_car      
          app.get("/api/v1/get_obsolete_car", (req, res, _next) => {
            get_obsolete_carRouter(req, res, jwt);
          });
      

          // --   @endpoint: /api/v1//api/v1/add_bid    ----------------      
          app.post("/api/v1/add_bid", (req, res, _next) => {
            add_bidRouter(req, res, jwt);
          });
      

          //   @endpoint: /api/v1/get_obsoletecar_bidreport_totalbids?id=&page=1&per_page=100      
          app.get("/api/v1/get_obsoletecar_bid", (req, res, _next) => {
            get_obsoletecar_bidRouter(req, res, jwt);
          });
      
          //    * @endpoint: /api/v1/get_obsoletecar_bid?page=1&per_page=100      
          app.get( "/api/v1/get_obsoletecar_bidreport_totalbids", (req, res, _next) => {
            get_obsoletecar_bidreport_totalbidsRouter(req, res, jwt);
            });

    }
}
