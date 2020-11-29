import { getAccIntroducersRouter } from "./AccIntroducers/route";
import { getAccountStatiticsByProductsRouter } from "./AccountStatiticsByProducts/route";
import { getAccountProfitabilityRouter } from "./AccountProfitability/route";
import { getAccountStatiticsByRegionRouter } from "./AccountStatiticsByRegion/route";
import { getAccountStatiticsByZonesRouter } from "./AccountStatiticsByZones/route";
import { getTopDepositorsRouter } from "./TopDepositors/route";
import { getRMDashboardRouter } from "./RMDashboard/route";
import { getRMNonFinancialsRouter } from "./RMNonFinancials/route";
import { getRMnonfinancialdetailsRouter } from "./RMnonfinancialdetails/route";
import { getTotalDepositSumRouter } from "./TotalDepositSum/route";
import { getTotalDepositSumBreakdownRouter } from "./TotalDepositSumBreakdown/route";
import { getTotalCasaRouter } from "./TotalCasa/route";
import { getTotalCasaBreakdownRouter } from "./TotalCasaBreakdown/route";
import { getTotalFDSumRouter } from "./TotalFDSum/route";
import { getTotalFDSumBreakdownRouter } from "./TotalFDSumBreakdown/route";


export default class PMSReportRouter {

    setupRouter(app, jwt, redis) {
        
        // @endpoint: /api/v1/getAccountProfitability?searchterm=0&value=0233844333&monthfrom=1&monthto=1&type=a
        app.get('/api/v1/getAccountProfitability', (req, res, _next) => {
            getAccountProfitabilityRouter(req, res, jwt, redis);
        });


        // @endpoint: /api/v1/getAccountStatiticsByProducts
        app.get('/api/v1/getAccountStatiticsByProducts', (req, res, _next) => {
            getAccountStatiticsByProductsRouter(req, res, jwt, redis);
        });

        // @endpoint: /api/v1/getAccIntroducers?datefrom=&dateto=&accnumber=&page=1&per_page=100
        app.get('/api/v1/getAccIntroducers', (req, res, _next) => {
            getAccIntroducersRouter(req, res, jwt, redis);
        });


        // @endpoint: /api/v1/getAccountStatiticsByRegion/IS002
        app.get('/api/v1/getAccountStatiticsByRegion/:productcode', (req, res, _next) => {
            getAccountStatiticsByRegionRouter(req, res, jwt, redis);
        });

        // @endpoint: /api/v1/getAccountStatiticsByZones?productcode=IS002&regioncode=1314
        app.get('/api/v1/getAccountStatiticsByZones', (req, res, _next) => {
            getAccountStatiticsByZonesRouter(req, res, jwt, redis);
        });

    // @endpoint: /api/v1/getTopDepositors?reportType=c&_date=08-AUG-2018&branchCode=&page=1&per_page=100&export=0
    app.get('/api/v1/getTopDepositors', (req, res, _next) => {
        getTopDepositorsRouter(req, res, jwt, redis);
    });


    // @endpoint: /api/v1/getRMDashboard?userId=
    app.get('/api/v1/getRMDashboard', (req, res, _next) => {
        getRMDashboardRouter(req, res, jwt, redis);
    });

    //  @endpoint: /api/v1/getRMNonFinancials?userId=
    app.get('/api/v1/getRMNonFinancials', (req, res, _next) => {
        getRMNonFinancialsRouter(req, res, jwt, redis);
    });

        //    * @endpoint: /api/v1/getRMnonfinancialdetails?userId=&type=&page=1&per_page=15&_export=&filterText=
    app.get('/api/v1/getRMnonfinancialdetails', async (req, res, _next) => {
        getRMnonfinancialdetailsRouter(req, res, jwt, redis);
    });

        //  @endpoint: api/v1/getTotalDepositSum?userId=08026&startDate=01-Jan-2018&endDate=02-Feb-2018
        app.get('/api/v1/getTotalDepositSum', (req, res, _next) => {
            getTotalDepositSumRouter(req, res, jwt, redis);
        });  

    //  @endpoint: /api/v1/getTotalDepositSumBreakdown?userId=
    app.get('/api/v1/getTotalDepositSumBreakdown', (req, res, _next) => {
        getTotalDepositSumBreakdownRouter(req, res, jwt, redis);
    });  

    // @endpoint: /api/v1/getTotalCasa?userId=
    app.get('/api/v1/getTotalCasa', (req, res, _next) => {
        getTotalCasaRouter(req, res, jwt, redis);
    });  

    //  @endpoint: /api/v1/getTotalCasaBreakdown?userId=
    app.get('/api/v1/getTotalCasaBreakdown', (req, res) => {
        getTotalCasaBreakdownRouter(req, res, jwt, redis);
    });  

    // @endpoint: /api/v1/getTotalFDSum?userId=
    app.get('/api/v1/getTotalFDSum', (req, res) => {
        getTotalFDSumRouter(req, res, jwt, redis);
    });  

    // @endpoint: /api/v1/getTotalFDSumBreakdown?userId=
    app.get('/api/v1/getTotalFDSumBreakdown', (req, res, _next) => {
        getTotalFDSumBreakdownRouter(req, res, jwt, redis);
    }); 



}
}
