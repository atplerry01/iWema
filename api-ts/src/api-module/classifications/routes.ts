import { getRegionListRouter } from "./getRegionList/route";
import { getZoneListRouter } from "./getZoneList/route";
import { getBranchListRouter } from "./getBranchList/route";
import { getZoneListByRegionRouter } from "./getZoneListByRegion/route";
import { getBranchListByRegionRouter } from "./getBranchListByRegion/route";
import { getBranchListByZoneRouter } from "./getBranchListByZone/route";


export default class ClassificationRouter {

    setupRouter(app) {


    app.get('/api/v1/getRegionList', (_req, res) => {
        getRegionListRouter(res);
     });


     //  * @endpoint: /api/v1/getZoneList
     app.get('/api/v1/getZoneList', (_req, res) => {
        getZoneListRouter(res);
     });


     //  * @endpoint: /api/v1/getBranchList
     app.get('/api/v1/getBranchList', (_req, res) => {
        getBranchListRouter(res);
     });


     //  * @endpoint: /api/v1/getZoneListByRegion/:regioncode
     app.get('/api/v1/getZoneListByRegion/:regioncode', (req, res) => {
        getZoneListByRegionRouter(req, res);
     });


     //  * @endpoint: /api/v1/getBranchListByRegion/:regioncode
     app.get('/api/v1/getBranchListByRegion/:regioncode', (req, res) => {
        getBranchListByRegionRouter(req, res);
     });

     //  * @endpoint: /api/v1/getBranchListByZone/:zonecode
     app.get('/api/v1/getBranchListByZone/:zonecode', (req, res) => {
        getBranchListByZoneRouter(req, res);
     });


    

    }
}
