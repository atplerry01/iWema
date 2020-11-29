import { getAccountStatiticsByBranchesRouter } from "./AccountStatiticsByBranches/route";
import { getAccountStatiticsByRegionGraphRouter } from "./AccountStatiticsByRegion/route";
import { getAccountStatiticsByZonesGraphRouter } from "./AccountStatiticsByZones/route";


export default class GraphsRouter {


    setupRouter(app, jwt, redis) {


        //  * @endpoint: /api/v1/getAccountStatiticsByBranches?producttype=Savings&zonecode=1314
        app.get('/api/v1/getAccountStatiticsByBranches', (req, res, _next) => {
            getAccountStatiticsByBranchesRouter(req, res, jwt, redis);
        });   

        //  @endpoint: /api/v1/getAccountStatiticsByZones?producttype=Savings&regioncode=1314
        app.get('/api/v1/getAccountStatiticsByZonesGraph', (req, res, _next) => {
            getAccountStatiticsByRegionGraphRouter(req, res, jwt, redis);
        });

        //  * @endpoint: /api/v1/getAccountStatiticsByRegionGraph/Savings
        app.get('/api/v1/getAccountStatiticsByRegionGraph/:producttype', (req, res) => {
            getAccountStatiticsByZonesGraphRouter(req, res, jwt, redis);
        });


    }
}
