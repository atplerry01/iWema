import { getFirstTimeDebitRouter } from './FirstTimeDebit/route';
import { getRiskAssetsRouter } from './RiskAssets/route';
import { getMaturity_profileRouter } from './Maturity_profile/route';
import { get_BetCollectionPerformanceRouter } from './BetCollectionPerformance/route';
import { get_betCompaniesListRouter } from './BetCompaniesList/route';
import { getCallOverRouter } from './CallOver/route';
import { getChannelMovementRouter } from './ChannelMovement/route';
import { getCorporateBorrowInfoRouter } from './CorporateBorrowInfo/route';
import { getCorporatePrincipalBorrowerRotuer } from './CorporatePrincipalBorrower/route';
import { getCreditInformationRouter } from './CreditInformation/route';
import { get_FIMIRouter } from './FIMI/route';
import { getFinLiveRouter } from './FinLive/route';
import { getFixedDepositRouter } from './FixedDeposit/route';
import { getGuarantorInfoRouter } from './GuarantorInfo/route';
import { getIndividualBorrowerRouter } from './IndividualBorrower/route';
import { getPartLiquidatedFixedDepositRouter } from './PartLiquidatedFixedDeposit/route';
import { getLimitNotificationRouter } from './LimitNotification/route';
import { getPartLiquidatedFixedDepositDrilldownRouter } from './PartLiquidatedFixedDepositDrilldown/route';
import { getTopCustomers_td_casaRouter } from './TopCustomers_td_casa/route';
import { getTopCustomersAvgVolRouter } from './TopCustomersAvgVol/route';
import { getWemaCollectReportRouter } from './WemaCollectReport/route';

import PMSReportRouter from './PMS/routes';
    // tslint:disable:max-line-length

export default class ReportRouter {

    pmsReportRouter: any;
    constructor() {
        this.pmsReportRouter = new PMSReportRouter();
    }

    setupRouter(app, jwt, redis) {

        // PMS reports routes
        this.pmsReportRouter.setupRouter(app, jwt, redis);
        
        //  @endpoint: /api/v1/getFirstTimeDebit?branchcode=039
        app.get('/api/v1/getFirstTimeDebit', (req, res, __next) => {
            getFirstTimeDebitRouter(req, res, jwt, redis);
        });


        // @endpoint: /api/v1/getRiskAssets?bankcode=0&classification=0
        app.get('/api/v1/getRiskAssets', (req, res, __next) => {
            getRiskAssetsRouter(req, res, jwt, redis);
        });

        // @endpoint: /api/v1/getMaturity_profile?bankcode=0&days=0
        app.get('/api/v1/getMaturity_profile', (req, res, __next) => {
            getMaturity_profileRouter(req, res, jwt, redis);
        });

       // @endpoint: /api/v1/get_BetCollectionPerformance?acountNo=xxx&startDate=09-aug-2018&endDate=10-aug-2018
      app.get('/api/v1/get_BetCollectionPerformance', (req, res, _next) => {
        get_BetCollectionPerformanceRouter(req, res, jwt, redis);
      });

        // @endpoint: /api/v1/get_betCompaniesList
        app.get('/api/v1/get_betCompaniesList', (req, res, _next) => {
            get_betCompaniesListRouter(req, res, jwt);
        });

        // to export data only, change export=1
        // @endpoint: /api/v1/getCallOver?selecteddate=05-Jan-2018&branchCode=004&page=${this.page}&per_page=${this.per_page}&filterUserId=${this.filterUserId}&export=1
        app.get('/api/v1/getCallOver', (req, res, __next) => {
            getCallOverRouter(req, res, jwt, redis);
        });

        // @endpoint: /api/v1/getChannelMovement
        app.get('/api/v1/getChannelMovement', (req, res, __next) => {
            getChannelMovementRouter(req, res, jwt, redis);
        });

      
        // @endpoint: /api/v1/getCorporateBorrowInfo?callDate=09-aug-2018&page=1&per_page=100
        app.get('/api/v1/getCorporateBorrowInfoRouter', (req, res) => {
            getCorporateBorrowInfoRouter(req, res, jwt, redis);
        });

        // @endpoint: /api/v1/getCorporatePrincipalBorrower?callDate=09-aug-2018&page=1&per_page=100
       app.get('/api/v1/getCorporatePrincipalBorrower', (req, res) => {
            getCorporatePrincipalBorrowerRotuer(req, res, jwt, redis);
       });

       // @endpoint: /api/v1/getCreditInformation?callDate=09-aug-2018&page=1&per_page=100
      app.get('/api/v1/getCreditInformation', (req, res) => {
        getCreditInformationRouter(req, res, jwt, redis);
    });

    // @endpoint: /api/v1/get_FimiLog?type=&datefrom=&dateTo=&accno=
   app.get('/api/v1/get_FIMI', (req, res, _next) => {
        get_FIMIRouter(req, res, jwt);
    });

    // @endpoint: /api/v1/getFinLive?callDate=09-aug-2018&page=1&per_page=100
   app.get('/api/v1/getFinLive', (req, res, _next) => {
        getFinLiveRouter(req, res, jwt, redis);
    });

    // @endpoint: /api/v1/getFixedDeposit?startDate=09-aug-2018&endDate=10-aug-2018&accountNo=&branchCode=&page=1&per_page=100&export=0
   app.get('/api/v1/getFixedDeposit', (req, res, _next) => {
        getFixedDepositRouter(req, res, jwt, redis);
    });

    // @endpoint: /api/v1/getGuarantorInfo?callDate=09-aug-2018&page=1&per_page=100
   app.get('/api/v1/getGuarantorInfo', (req, res, _next) => {
        getGuarantorInfoRouter(req, res, jwt, redis);
    });

    // @endpoint: /api/v1/getIndividualBorrower?callDate=09-aug-2018&page=1&per_page=100
    app.get('/api/v1/getIndividualBorrower', (req, res, _next) => {
        getIndividualBorrowerRouter(req, res, jwt, redis);
    });

    // @endpoint: /api/v1/getPartLiquidatedFixedDeposit?dateType=startDate=09-aug-2018&endDate=10-aug-2018&accountNo=&branchCode=&status=&page=1&per_page=15&export=0
    app.get('/api/v1/getPartLiquidatedFixedDeposit', (req, res, _next) => {
        getPartLiquidatedFixedDepositRouter(req, res, jwt, redis);
    });

    // @endpoint: /api/v1/getLimitNotification?datefrom=04-01-2018&dateto=08-08-2018&page=1&per_page=100&export=0
    app.get('/api/v1/getLimitNotification', (req, res, __next) => {
        getLimitNotificationRouter(req, res, jwt);
    });    


    // @endpoint: /api/v1/getPartLiquidatedFixedDepositDrilldown?entityId=xxx&startDate=09-aug-2018&endDate=10-aug-2018
   app.get('/api/v1/getPartLiquidatedFixedDepositDrilldown', (req, res, _next) => {
    getPartLiquidatedFixedDepositDrilldownRouter(req, res, jwt, redis);
    }); 


    // @endpoint: /api/v1/getTopCustomers_td_casa?reportType=casa&branchCode=004&selectedDate=05-Jan-2018
    app.get('/api/v1/getTopCustomers_td_casa', (req, res, __next) => {
        getTopCustomers_td_casaRouter(req, res, jwt, redis);
    }); 

    // @endpoint: /api/v1/getTopCustomersAvgVol?datefrom=01-jul-2018&dateto=31-jul-2018&page=1&per_page=100&export=0
    app.get('/api/v1/getTopCustomersAvgVol', (req, res, _next) => {
        getTopCustomersAvgVolRouter(req, res, jwt, redis);
    }); 


        // @endpoint: /api/v1/getWemaCollectReport?datefrom=04-01-2018&dateto=08-08-2018&page=1&per_page=100&webguid=&export=
    app.get('/api/v1/getWemaCollectReport', (req, res) => {
        getWemaCollectReportRouter(req, res, jwt, redis);
    });    


    }
}
