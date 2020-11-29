import { getAccountOpeningBalanceRouter } from "./getAccountOpeningBalance/route";
import { getAccountStatementRouter } from "./getAccountStatement/route";
import { getCustomerAccountsRouter } from "./getCustomerAccounts/route";
import { getCustomerAccountsTransStatRouter } from "./getCustomerAccountsTransStat/route";
import { getCustomerLoanRouter } from "./getCustomerLoan/route";
import { getCustomerTDRouter } from "./getCustomerTD/route";
import { getMyAccountsRouter } from "./getMyAccounts/route";
import { LogAccountStatementDownloadRouter } from "./logAccountStatementPrinting/route";
import { searchAccountByAccNameRouter } from "./searchAccountByAccName/route";



export default class BankAccountsRouter {


    setupRouter(app, jwt, redis) {


       // @endpoint: /api/v1/searchAccountByAccName/:accname
        app.get('/api/v1/searchAccountByAccName/:accname', (req, res, _next) => {
            searchAccountByAccNameRouter(req, res, jwt, redis);        
        });   

         // @endpoint: /api/v1/getMyAccounts?accno=00000000&ownaccount=1
        app.get('/api/v1/getMyAccounts', (req, res, _next) => {
            getMyAccountsRouter(req, res, jwt);  
        });
        
        // @endpoint: /api/v1/getCustomerAccounts?accno=00000000&ownaccount=1
        app.get('/api/v1/getCustomerAccounts', (req, res, _next) => {
            getCustomerAccountsRouter(req, res, jwt);  
        });

        // @endpoint: /api/v1/getCustomerAccountsTransStat?accno=0122456310&cDate=11-Jun-2018&cMonthStartDate=01-Jun-2018&cMonthEndDate=30-Jun-2018&cYearStartDate=01-Jan-2018&cYearEndDate=31-Dec-2018
        app.get('/api/v1/getCustomerAccountsTransStat', (req, res, _next) => {
            getCustomerAccountsTransStatRouter(req, res, jwt);  
        }); 

        // @endpoint: /api/v1/getAccountStatement?accno=0122456310&datefrom=01-Jan-2018&dateto=01-Jun-2018
        app.get('/api/v1/getAccountStatement', (req, res, _next) => {
            getAccountStatementRouter(req, res, jwt);  
        });         

         // @endpoint: /api/v1/getCustomerTD/0122456310
        app.get('/api/v1/getCustomerTD/:accno', (req, res, _next) => {
            getCustomerTDRouter(req, res, jwt);  
        });    

        // * @endpoint: /api/v1/getCustomerLoan/0122456310
        app.get('/api/v1/getCustomerLoan/:accno', (req, res, _next) => {
            getCustomerLoanRouter(req, res, jwt);  
        }); 

        // * @endpoint: /api/v1/getAccountOpeningBalance?accno=2001202$datefrom='01-02-20018'
        app.get('/api/v1/getAccountOpeningBalance', (req, res, _next) => {
            getAccountOpeningBalanceRouter(req, res, jwt);  
        }); 

         // * @endpoint: /api/v1/LogAccountStatementDownload
         app.post('/api/v1/LogAccountStatementDownload', (req, res, _next) => {
            LogAccountStatementDownloadRouter(req, res, jwt);  
        }); 

    }
}
