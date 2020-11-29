// tslint:disable:no-unused-expression

// mock library like Sinon.js

// During the test the env variable is set to test
process.env.NODE_ENV = "test";
// Require the dev-dependencies
import * as chai from "chai";
import index = require("../index");
import chaiHttp = require("chai-http");
chai.use(chaiHttp);
chai.should();
const expect = chai.expect;
// const should = chai.should();

let userToken = "";
const password = process.env.TEST_PASSWORD;


it("it should authenticate to get Token only", done => {
  const user = {
    username: "ishmael.gyaban",
    password: password
  };
  chai
    .request(index)
    .post("/api/v1/users/login")
    .send(user)
    .end((_err, res) => {
      userToken = res.body.token;
      expect(userToken).not.eql("");

      done();
    });
});



// -----------------------------------------------------------------------------------------------------------------------------
// ---------GET /api/v1/getRMnonfinancialdetails?userId=081666&type= --------
// -----------------------------------------------------------------------------------------------------------------------------

describe("/api/v1/getRMnonfinancialdetails", () => {

  const url = '/api/v1/getRMnonfinancialdetails?userId=08166&type=';

  it("it should not retreive any data for unauthorized user", done => {
    chai
      .request(index)
      .get(url)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
         res.body.should.have.property("error");
        done();
      });
  });


  it("it should pull total deposit details", (done) => {

    chai
      .request(index)
      .get(url + 'td')
      .set("x-access-token", userToken)
      .end((_err, res) => {
       //  console.log("result:.....",   res.body);
         res.should.have.status(200);
         res.body.should.be.a("array");

        res.body[0].should.have.property("ACCT_NUMBER").not.empty;
        res.body[0].should.have.property("ACCT_NAME").not.empty;
        res.body[0].should.have.property("ACCT_OPN_DATE").not.empty;
        res.body[0].should.have.property("PRODUCT_NAME").not.empty;
        res.body[0].should.have.property("BRANCH").not.empty;
        res.body[0].should.have.property("TOTAL").not.null;

        done();
      });
  });

  it("it should pull total loans details", (done) => {

    chai
      .request(index)
      .get(url + 'tl')
      .set("x-access-token", userToken)
      .end((_err, res) => {
        // console.log("result:.....",   res.body[0]);
         res.should.have.status(200);
         res.body.should.be.a("array");

        res.body[0].should.have.property("ACCT_NUMBER").not.empty;
        res.body[0].should.have.property("ACCT_NAME").not.empty;
        res.body[0].should.have.property("ACCT_OPN_DATE").not.empty;
        res.body[0].should.have.property("PRODUCT_NAME").not.empty;
        res.body[0].should.have.property("BRANCH").not.empty;
        res.body[0].should.have.property("TOTAL").not.null;

        done();
      });
  });


  it("it should pull total accounts details", (done) => {

    chai
      .request(index)
      .get(url + 'ta')
      .set("x-access-token", userToken)
      .end((_err, res) => {
       //  console.log("result:.....",   res.body[0]);
         res.should.have.status(200);
         res.body.should.be.a("array");

        res.body[0].should.have.property("ACCT_NUMBER").not.empty;
        res.body[0].should.have.property("ACCT_NAME").not.empty;
        res.body[0].should.have.property("ACCT_OPN_DATE").not.empty;
        res.body[0].should.have.property("PRODUCT_NAME").not.empty;
        res.body[0].should.have.property("BRANCH").not.empty;
        res.body[0].should.have.property("TOTAL").not.null;

        done();
      });
  });

  it("it should pull total accounts for current year details", (done) => {

    chai
      .request(index)
      .get(url + 'tacy')
      .set("x-access-token", userToken)
      .end((_err, res) => {
        // console.log("result:.....",   res.body[0]);
         res.should.have.status(200);
         res.body.should.be.a("array");

        res.body[0].should.have.property("ACCT_NUMBER").not.empty;
        res.body[0].should.have.property("ACCT_NAME").not.empty;
        res.body[0].should.have.property("ACCT_OPN_DATE").not.empty;
        res.body[0].should.have.property("PRODUCT_NAME").not.empty;
        res.body[0].should.have.property("BRANCH").not.empty;
        res.body[0].should.have.property("TOTAL").not.null;

        done();
      });
  });


  it("it should pull Total Accounts>5K Avg balance details", (done) => {

    chai
      .request(index)
      .get(url + 'ta5k')
      .set("x-access-token", userToken)
      .end((_err, res) => {
        // console.log("result:.....",   res.body[0]);
         res.should.have.status(200);
         res.body.should.be.a("array");

        res.body[0].should.have.property("ACCT_NUMBER").not.empty;
        res.body[0].should.have.property("ACCT_NAME").not.empty;
        res.body[0].should.have.property("ACCT_OPN_DATE").not.empty;
        res.body[0].should.have.property("PRODUCT_NAME").not.empty;
        res.body[0].should.have.property("BRANCH").not.empty;
        res.body[0].should.have.property("TOTAL").not.null;

        done();
      });
  });


  it("it should pull unfunded account details", (done) => {

    chai
      .request(index)
      .get(url + 'ua')
      .set("x-access-token", userToken)
      .end((_err, res) => {
        // console.log("result:.....",   res.body[0]);
         res.should.have.status(200);
         res.body.should.be.a("array");

        res.body[0].should.have.property("ACCT_NUMBER").not.empty;
        res.body[0].should.have.property("ACCT_NAME").not.empty;
        res.body[0].should.have.property("ACCT_OPN_DATE").not.empty;
        res.body[0].should.have.property("BALANCE").not.null;
        res.body[0].should.have.property("CURRENCY_TYPE").not.empty;
        res.body[0].should.have.property("PHONE").not.empty;
        res.body[0].should.have.property("PREFERREDPHONE").not.empty;
        res.body[0].should.have.property("EMAIL").not.empty;
        res.body[0].should.have.property("ADDRESS_LINE1");
        res.body[0].should.have.property("ADDRESS_LINE2");
        res.body[0].should.have.property("ADDRESS_LINE3");
        res.body[0].should.have.property("STATE");
        res.body[0].should.have.property("COUNTRY");

        done();
      });
  });


  it("it should pull total active./inactive/dormant account details", (done) => {

    chai
      .request(index)
      .get(url + 'tad') // tasi = inactive, tasd = dormants, 
      .set("x-access-token", userToken)
      .end((_err, res) => {
       //  console.log("result:.....",   res.body[0]);
         res.should.have.status(200);
         res.body.should.be.a("array");

        res.body[0].should.have.property("ACCT_NUMBER").not.empty;
        res.body[0].should.have.property("ACCT_NAME").not.empty;
        res.body[0].should.have.property("BALANCE").not.null;
        res.body[0].should.have.property("PRODUCT_NAME").not.empty;
        res.body[0].should.have.property("BRANCH").not.empty;
        res.body[0].should.have.property("ACCT_STATUS").not.empty;
        res.body[0].should.have.property("ACCT_STATUS_DATE").not.empty;

        done();
      });
  });


  
  it("it should pull total reactivated account for current year/month details", (done) => {

    chai
      .request(index)
      .get(url + 'tracy') // tracm = current month 
      .set("x-access-token", userToken)
      .end((_err, res) => {
        // console.log("result:.....",   res.body[0]);
         res.should.have.status(200);
         res.body.should.be.a("array");

        res.body[0].should.have.property("ACCT_NUMBER").not.empty;
        res.body[0].should.have.property("ACCT_NAME").not.empty;
        res.body[0].should.have.property("BALANCE").not.null;
        res.body[0].should.have.property("ACCT_OPN_DATE").not.empty;
        res.body[0].should.have.property("ACCT_STATUS").not.empty;
        res.body[0].should.have.property("PRODUCT_NAME").not.empty;
        res.body[0].should.have.property("BRANCH").not.empty;
        res.body[0].should.have.property("ACCT_MGR_USER_ID").not.empty;
        res.body[0].should.have.property("ACCT_CRNCY_CODE").not.empty;
        res.body[0].should.have.property("ACCT_STATUS_DATE").not.empty;
        res.body[0].should.have.property("DATE_OF_BIRTH").not.empty;
        res.body[0].should.have.property("SALUTATION").not.empty;
        res.body[0].should.have.property("GENDER").not.empty;
        res.body[0].should.have.property("PHONE");
        res.body[0].should.have.property("PREFERREDPHONE").not.empty;
        res.body[0].should.have.property("EMAIL");
        res.body[0].should.have.property("ADDRESS_LINE1");
        res.body[0].should.have.property("ADDRESS_LINE2");
        res.body[0].should.have.property("ADDRESS_LINE3");
        res.body[0].should.have.property("STATE");
        res.body[0].should.have.property("COUNTRY");

        done();
      });
  });




});



// -----------------------------------------------------------------------------------------------------------------------------
// ---------GET /api/v1/getRMNonFinancials?userId=08166 --------
// -----------------------------------------------------------------------------------------------------------------------------

describe("/api/v1/getRMNonFinancials", () => {

  const url = '/api/v1/getRMNonFinancials?userId=08166';

  it("it should not retreive any data for unauthorized user", done => {
    chai
      .request(index)
      .get(url)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });


  it("it should pull pass for authenticated user", (done) => {

    chai
      .request(index)
      .get(url)
      .set("x-access-token", userToken)
      .end((_err, res) => {
       //  console.log("result:.....",   res.body);
         res.should.have.status(200);
         res.body.should.be.a("array");

         const TOTAL_ACCTS = res.body[0][0].TOTAL_ACCTS;
         const TOTAL_ACCTS_YEAR = res.body[1][0].TOTAL_ACCTS;
         const TOTAL_ACCTS_5K_AVG = res.body[2][0].TOTAL_ACCTS_5K_AVG;
         const UNFUNDED_ACCTS = res.body[3][0].UNFUNDED_ACCTS;
         const ACTIVE_ACCT = res.body[4][0].ACCT_STATUS;
         const INACTIVE_ACCT = res.body[5][0].ACCT_STATUS;
         const DORMANT_ACCT = res.body[6][0].ACCT_STATUS;
         const REACTIVATED_ACCTS_YEAR = res.body[7][0].REACTIVATED_ACCTS;
         const REACTIVATED_ACCTS_MONTH = res.body[8][0].REACTIVATED_ACCTS;

         expect(TOTAL_ACCTS).not.null;
         expect(TOTAL_ACCTS_YEAR).not.null;
         expect(TOTAL_ACCTS_5K_AVG).not.null;
         expect(UNFUNDED_ACCTS).not.null;
         expect(ACTIVE_ACCT).not.null;
         expect(INACTIVE_ACCT).not.null;
         expect(DORMANT_ACCT).not.null;
         expect(REACTIVATED_ACCTS_YEAR).not.null;
         expect(REACTIVATED_ACCTS_MONTH).not.null;

        done();
      });
  });

});



// -----------------------------------------------------------------------------------------------------------------------------
// ---------GET /api/v1/getRMDashboard?userId=S08166 --------
// -----------------------------------------------------------------------------------------------------------------------------

describe("/api/v1/getRMDashboard", () => {

  const url = '/api/v1/getRMDashboard?userId=08166';

  it("it should not retreive any data for unauthorized user", done => {
    chai
      .request(index)
      .get(url)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });


  it("it should pull pass for authenticated user", (done) => {

    chai
      .request(index)
      .get(url)
      .set("x-access-token", userToken)
      .end((_err, res) => {
       //  console.log("result:.....",   res.body);
         res.should.have.status(200);
         res.body.should.be.a("array");

         const TOTAL_DEPOSIT = res.body[0][0].TOTAL_DEPOSIT;
         const TOTAL_LOAN = res.body[1][0].TOTAL_LOAN;
         const TOTAL_ACCTS = res.body[2][0].TOTAL_ACCTS;

        expect(TOTAL_DEPOSIT).greaterThan(0);
        expect(TOTAL_LOAN).not.null;
        expect(TOTAL_ACCTS).greaterThan(0);

        done();
      });
  });

});


// -----------------------------------------------------------------------------------------------------------------------------
// ---------GET /api/v1/getAccountProfitability?searchterm=0&value=0233844333&monthfrom=1&monthto=1&type=a --------
// -----------------------------------------------------------------------------------------------------------------------------

describe("/api/v1/getAccountProfitability", () => {


  it("it should not retreive any data for unauthorized user", done => {
    chai
      .request(index)
      .get(`/api/v1/getAccountProfitability?searchterm=0&value=0220000035&monthfrom=1&monthto=1&type=a`)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });


  it("it should pass Liability by branch search", (done) => {

    chai
      .request(index)
      .get(`/api/v1/getAccountProfitability?searchterm=1&value=001&monthfrom=1&monthto=1&type=l`)
      .set("x-access-token", userToken)
      .end((_err, res) => {
       //  console.log("result:.....",   res.body[0]);
        res.should.have.status(200);
        res.body.should.be.a("array");

        res.body[0].should.have.property("AccountNo").not.empty;
        res.body[0].should.have.property("AccountName").not.empty;
        res.body[0].should.have.property("CustomerId").not.empty;
        res.body[0].should.have.property("BranchNo").not.empty;
        res.body[0].should.have.property("Branch").not.empty;
        res.body[0].should.have.property("ProductCode").not.empty;
        res.body[0].should.have.property("Product").not.empty;
        res.body[0].should.have.property("Type").not.empty;
        res.body[0].should.have.property("Balance").not.null;
        res.body[0].should.have.property("TurnoverDebit").not.null;
        res.body[0].should.have.property("TurnoverCredit").not.null;
        res.body[0].should.have.property("AvgBalanceDr").not.null;
        res.body[0].should.have.property("AvgBalanceCr").not.null;
        res.body[0].should.have.property("IntRate").not.null;
        res.body[0].should.have.property("LiquidityRatio").not.null;
        res.body[0].should.have.property("CashReserve").not.null;
        res.body[0].should.have.property("PoolContribution").not.null;
         res.body[0].should.have.property("IncomeOnLiquidity").not.null;
         res.body[0].should.have.property("PoolCredit").not.null;
         res.body[0].should.have.property("FeeIncome").not.null;
         res.body[0].should.have.property("FloatIncome").not.null;
         res.body[0].should.have.property("IntExpense").not.null;
         res.body[0].should.have.property("NRFF").not.null;
         res.body[0].should.have.property("AccMaintFee").not.null;
         res.body[0].should.have.property("TotalIncome").not.null;        
         res.body[0].should.have.property("AccountMgrId").not.empty;
         res.body[0].should.have.property("AccountMgr").not.empty;
         res.body[0].should.have.property("Period").not.empty;

        done();
      });
  });

  it("it should pass Asset by branch search", (done) => {

    chai
      .request(index)
      .get(`/api/v1/getAccountProfitability?searchterm=1&value=001&monthfrom=1&monthto=1&type=a`)
      .set("x-access-token", userToken)
      .end((_err, res) => {
      //   console.log("result:.....2",   res.body[0]);
        res.should.have.status(200);
        res.body.should.be.a("array");

        res.body[0].should.have.property("AccountNo").not.empty;
        res.body[0].should.have.property("AccountName").not.empty;
        res.body[0].should.have.property("CustomerId").not.empty;
        res.body[0].should.have.property("BranchNo").not.empty;
        res.body[0].should.have.property("Branch").not.empty;
        res.body[0].should.have.property("ProductCode").not.empty;
        res.body[0].should.have.property("Product").not.empty;
        res.body[0].should.have.property("Type").not.empty;
        res.body[0].should.have.property("Balance").not.null;
        res.body[0].should.have.property("TurnoverDebit").not.null;
        res.body[0].should.have.property("TurnoverCredit").not.null;
        res.body[0].should.have.property("AvgBalanceDr").not.null;
        res.body[0].should.have.property("AvgBalanceCr").not.null;
        res.body[0].should.have.property("IntRate").not.null;
         res.body[0].should.have.property("FeeIncome").not.null;
         res.body[0].should.have.property("IntIncome").not.null; 
         res.body[0].should.have.property("AccMaintFee").not.null; 
         res.body[0].should.have.property("TotalIncome").not.null; 
         res.body[0].should.have.property("EffectiveYield").not.null;
         res.body[0].should.have.property("TransferPrice").not.null;
         res.body[0].should.have.property("PoolCharge").not.null;
         res.body[0].should.have.property("NRFF").not.null;

         res.body[0].should.have.property("AccountMgrId").not.empty;
         res.body[0].should.have.property("AccountMgr").not.empty;
         res.body[0].should.have.property("Period").not.empty;

        done();
      });
  });

  it("it should pass by account number search", (done) => {

    chai
      .request(index)
      .get(`/api/v1/getAccountProfitability?searchterm=0&value=0220000035&monthfrom=1&monthto=1&type=l`)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        // console.log("result:.....",   res.body);
        res.should.have.status(200);
        res.body.should.be.a("array");

        res.body[0].should.have.property("AccountNo").not.empty;
        res.body[0].should.have.property("AccountName").not.empty;
        res.body[0].should.have.property("CustomerId").not.empty;
        res.body[0].should.have.property("BranchNo").not.empty;
        res.body[0].should.have.property("Branch").not.empty;
        res.body[0].should.have.property("ProductCode").not.empty;
        res.body[0].should.have.property("Product").not.empty;
        res.body[0].should.have.property("Type").not.empty;
        res.body[0].should.have.property("Balance").not.null;
        res.body[0].should.have.property("TurnoverDebit").not.null;
        res.body[0].should.have.property("TurnoverCredit").not.null;
        res.body[0].should.have.property("AvgBalanceDr").not.null;
        res.body[0].should.have.property("AvgBalanceCr").not.null;
        res.body[0].should.have.property("IntRate").not.null;
        res.body[0].should.have.property("LiquidityRatio").not.null;
        res.body[0].should.have.property("CashReserve").not.null;
        res.body[0].should.have.property("PoolSource").not.null;
        res.body[0].should.have.property("IncomeOnLiquidity").not.null;
        res.body[0].should.have.property("PoolCredit").not.null;
        res.body[0].should.have.property("FeeIncome").not.null;
        res.body[0].should.have.property("IntIncome").not.null;
        res.body[0].should.have.property("IntExpense").not.null;
        res.body[0].should.have.property("NRFF").not.null;
        res.body[0].should.have.property("AccMaintFee").not.null;
        res.body[0].should.have.property("TotalIncome").not.null;
        res.body[0].should.have.property("EffectiveYield").not.null;
        res.body[0].should.have.property("TransferPrice").not.null;
        res.body[0].should.have.property("ROA").not.null;
        res.body[0].should.have.property("AccountMgrId").not.empty;
        res.body[0].should.have.property("AccountMgr").not.empty;
        res.body[0].should.have.property("Period").not.empty;

        done();
      });
  });


});




// -----------------------------------------------------------------------------------------------------------------------------
// to export data only, change export=1
// ---------GET /api/v1/menus?name=&page=1&per_page=100 --------
// -----------------------------------------------------------------------------------------------------------------------------

describe("/api/v1/menu", () => {


  it("it should not retreive any data for unauthorized user", done => {
    chai
      .request(index)
      .get(`/api/v1/menus?name=&page=1&per_page=100`)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });




  it("it should retrieve data for authenticated user", (done) => {

    chai
      .request(index)
      .get(`/api/v1/menus?name=&page=1&per_page=100`)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        //  console.log("result:.....",   res.body);
        res.should.have.status(200);
        res.body.should.be.a("object");

        res.body.should.have.property("pre_page");
        res.body.should.have.property("next_page");

        res.body.page.should.not.null;
        res.body.per_page.should.not.null;
        res.body.total.should.not.null;
        res.body.total_pages.should.not.null;

        res.body.data.should.be.a("array");
        //  console.log("data result:.....",   res.body.data[0]);
        res.body.data[0].should.have.property("idno").not.null;
        res.body.data[0].should.have.property("menu_id").not.empty;
        res.body.data[0].should.have.property("menu_name").not.empty;
        res.body.data[0].should.have.property("menu_order").not.empty;
        res.body.data[0].should.have.property("menu_image");
        res.body.data[0].should.have.property("menu_link");
        res.body.data[0].should.have.property("standalone").not.empty;
        res.body.data[0].should.have.property("status").not.empty;
        res.body.data[0].should.have.property("menu_display_inside").not.empty;

        done();
      });
  });

  it("Search menu by name", (done) => {

    chai
      .request(index)
      .get(`/api/v1/menus?name=About Us&page=1&per_page=100`)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        //  console.log("result:.....",   res.body);
        res.should.have.status(200);
        res.body.should.be.a("object");

        res.body.should.have.property("pre_page");
        res.body.should.have.property("next_page");

        res.body.page.should.not.null;
        res.body.per_page.should.not.null;
        res.body.total.should.not.null;
        res.body.total_pages.should.not.null;

        res.body.data.should.be.a("array");
        // console.log("data result:.....",   res.body);
        res.body.data[0].should.have.property("idno").not.null;
        res.body.data[0].should.have.property("menu_id").not.empty;
        res.body.data[0].should.have.property("menu_name").not.empty;
        res.body.data[0].should.have.property("menu_order").not.empty;
        res.body.data[0].should.have.property("menu_image");
        res.body.data[0].should.have.property("menu_link");
        res.body.data[0].should.have.property("standalone").not.empty;
        res.body.data[0].should.have.property("status").not.empty;
        res.body.data[0].should.have.property("menu_display_inside").not.empty;

        done();
      });
  });


  it("it should retrieve submenu for menu id:M002", (done) => {

    chai
      .request(index)
      .get(`/api/v1/submenus?menu_id=M002&name=&page=1&per_page=100`)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        //  console.log("result:.....",   res.body);
        res.should.have.status(200);
        res.body.should.be.a("object");

        res.body.should.have.property("pre_page");
        res.body.should.have.property("next_page");

        res.body.page.should.not.null;
        res.body.per_page.should.not.null;
        res.body.total.should.not.null;
        res.body.total_pages.should.not.null;

        res.body.data.should.be.a("array");
        //  console.log("data result:.....",   res.body.data[0]);
        res.body.data[0].should.have.property("idno").not.null;
        res.body.data[0].should.have.property("submenu_id").not.empty;
        res.body.data[0].should.have.property("menu_id").not.empty;
        res.body.data[0].should.have.property("submenu_name").not.empty;
        res.body.data[0].should.have.property("submenu_link").not.empty;
        res.body.data[0].should.have.property("submenu_display_inside").not.empty;
        res.body.data[0].should.have.property("submenu_order").not.null;
        res.body.data[0].should.have.property("favourite_status").not.empty;
        res.body.data[0].should.have.property("favourite_order");
        res.body.data[0].should.have.property("status").not.empty;

        done();
      });
  });


  it("Search sub-menu by name", (done) => {

    chai
      .request(index)
      .get(`/api/v1/submenus?menu_id=M002&name=risk&page=1&per_page=100`)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        //  console.log("result:.....",   res.body);
        res.should.have.status(200);
        res.body.should.be.a("object");

        res.body.should.have.property("pre_page");
        res.body.should.have.property("next_page");

        res.body.page.should.not.null;
        res.body.per_page.should.not.null;
        res.body.total.should.not.null;
        res.body.total_pages.should.not.null;

        res.body.data.should.be.a("array");
        res.body.data[0].should.have.property("idno").not.null;
        res.body.data[0].should.have.property("submenu_id").not.empty;
        res.body.data[0].should.have.property("menu_id").not.empty;
        res.body.data[0].should.have.property("submenu_name").not.empty;
        res.body.data[0].should.have.property("submenu_link").not.empty;
        res.body.data[0].should.have.property("submenu_display_inside").not.empty;
        res.body.data[0].should.have.property("submenu_order").not.null;
        res.body.data[0].should.have.property("favourite_status").not.empty;
        res.body.data[0].should.have.property("favourite_order");
        res.body.data[0].should.have.property("status").not.empty;

        done();
      });
  });


});


// expect(err).to.be.null;
// expect(Math.sqrt(-9)).to.be.NaN;


// -------------------------------------------
// ---------GET /api/v1/getChannelMovement --------
// -------------------------------------------

describe("/api/v1/getChannelMovement", () => {


  it("it should not retreive any data for unauthorized user", done => {
    chai
      .request(index)
      .get("/api/v1/getChannelMovement")
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });


  it("it should retrieve data for authorized user", done => {

    chai
      .request(index)
      .get("/api/v1/getChannelMovement")
      .set("x-access-token", userToken)
      .end((_err, res) => {

        res.should.have.status(200);
        res.body.should.be.a("array");

        res.body[0].should.have.property("IChannel").not.eql("");
        res.body[0].should.have.property("ITotalCount").not.eql("");
        res.body[0].should.have.property("ITotalAmount").not.eql("");
        res.body[0].should.have.property("ITranDate").not.eql("");
        res.body[0].should.have.property("IRemarks").not.eql("");
        res.body[0].should.have.property("OChannel").not.eql("");
        res.body[0].should.have.property("OTotalCount").not.eql("");
        res.body[0].should.have.property("OTotalAmount").not.eql("");
        res.body[0].should.have.property("OTranDate").not.eql("");
        res.body[0].should.have.property("ORemarks").not.eql("");
        res.body[0].should.have.property("P_IChannel").not.eql("");
        res.body[0].should.have.property("P_ITotalCount").not.eql("");
        res.body[0].should.have.property("P_ITotalAmount").not.eql("");
        res.body[0].should.have.property("P_ITranDate").not.eql("");
        res.body[0].should.have.property("P_IRemarks").not.eql("");
        res.body[0].should.have.property("P_OChannel").not.eql("");
        res.body[0].should.have.property("P_OTotalCount").not.eql("");
        res.body[0].should.have.property("P_OTotalAmount").not.eql("");
        res.body[0].should.have.property("P_OTranDate").not.eql("");
        res.body[0].should.have.property("P_ORemarks").not.eql("");


        done();
      });
  });


});





// --------------------------------------------------------------------------------------------------------------
// ---------GET /api/v1/getLimitNotification?datefrom=04-01-2018&dateto=08-08-2018&page=1&per_page=100&export=0 --------
// --------------------------------------------------------------------------------------------------------------

describe("/api/v1/getLimitNotification", () => {


  it("it should not retreive any data for unauthorized user", done => {
    chai
      .request(index)
      .get(`/api/v1/getLimitNotification?datefrom=04-01-2018&dateto=08-08-2018&page=1&per_page=100&export=0`)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });

  it("it should not retrieve any data for invalid date range", done => {
    chai
      .request(index)
      .get(`/api/v1/getLimitNotification?datefrom=2018-08-01&dateto=2018-04-08&page=1&per_page=100&export=0`)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array").to.eql([]);
        done();
      });
  });


  it("it should retrieve data for valid request", (done) => {

    chai
      .request(index)
      .get(`/api/v1/getLimitNotification?datefrom=04-01-2018&dateto=08-08-2018&page=1&per_page=100&export=0`)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");

        res.body.should.have.property("pre_page");
        res.body.should.have.property("next_page");

        res.body.page.should.not.null;
        res.body.per_page.should.not.null;
        res.body.total.should.not.null;
        res.body.total_pages.should.not.null;

        res.body.data.should.be.a("array");
        res.body.data[0].should.have.property("Phone").not.empty;
        res.body.data[0].should.have.property("Message").not.empty;
        res.body.data[0].should.have.property("SMSDate").not.empty;
        res.body.data[0].should.have.property("dlr_description").not.empty;
        res.body.data[0].should.have.property("BranchCode").not.empty;
        res.body.data[0].should.have.property("AccountNo").not.empty;
        res.body.data[0].should.have.property("AccountName").not.empty;
        res.body.data[0].should.have.property("SMSCount");

        done();
      });
  });


});





// -----------------------------------------------------------------------------------------------------------------------------
// to export data only, change export=1
// ---------GET /api/v1/getWemaCollectReport?datefrom=04-01-2018&dateto=08-08-2018&page=1&per_page=100&webguid=&export= --------
// -----------------------------------------------------------------------------------------------------------------------------

describe("/api/v1/getWemaCollectReport", () => {


  it("it should not retreive any data for unauthorized user", done => {
    chai
      .request(index)
      .get(`/api/v1/getWemaCollectReport?datefrom=04-01-2018&dateto=08-08-2018&page=1&per_page=100&webguid=&export=0`)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });

  it("it should not retrieve any data for invalid date range", done => {
    chai
      .request(index)
      .get(`/api/v1/getWemaCollectReport?datefrom=2018-08-01&dateto=2018-04-08&page=1&per_page=100&webguid=&export=0`)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array").to.eql([]);
        done();
      });
  });


  it("it should retrieve data for valid request", (done) => {

    chai
      .request(index)
      .get(`/api/v1/getWemaCollectReport?datefrom=04-01-2018&dateto=08-08-2018&page=1&per_page=100&webguid=&export=0`)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        //  console.log("result:.....",   res.body);
        res.should.have.status(200);
        res.body.should.be.a("object");

        res.body.should.have.property("pre_page");
        res.body.should.have.property("next_page");

        res.body.page.should.not.null;
        res.body.per_page.should.not.null;
        res.body.total.should.not.null;
        res.body.total_pages.should.not.null;

        res.body.data.should.be.a("array");
        // console.log("data result:.....",   res.body.data);
        res.body.data[0].should.have.property("webguid").not.empty;
        res.body.data[0].should.have.property("tellerName").not.empty;
        res.body.data[0].should.have.property("tillaccountDebited");
        res.body.data[0].should.have.property("tellerName").not.empty;
        res.body.data[0].should.have.property("transactionID");
        res.body.data[0].should.have.property("agencyCode").not.empty;
        res.body.data[0].should.have.property("revenueCode").not.empty;
        res.body.data[0].should.have.property("state").not.empty;
        res.body.data[0].should.have.property("accountNoCredited").not.empty;
        res.body.data[0].should.have.property("amount").not.empty;
        res.body.data[0].should.have.property("debitNarration").not.empty;
        res.body.data[0].should.have.property("creditNarration").not.empty;
        res.body.data[0].should.have.property("branchName").not.empty;
        res.body.data[0].should.have.property("paymentRef").not.empty;
        res.body.data[0].should.have.property("transactionType").not.empty;
        res.body.data[0].should.have.property("status"); // boolean
        res.body.data[0].should.have.property("transCode");
        res.body.data[0].should.have.property("transactionDate").not.empty;
        res.body.data[0].should.have.property("PayerName").not.empty;
        res.body.data[0].should.have.property("finacleResponse");

        done();
      });
  });


});






// -----------------------------------------------------------------------------------------------------------------------------
// to export data only, change export=1
// ---------GET /api/v1/getAccIntroducers?page=1&per_page=100 --------
// -----------------------------------------------------------------------------------------------------------------------------

describe("/api/v1/getAccIntroducers", () => {


  it("it should not retreive any data for unauthorized user", done => {
    chai
      .request(index)
      .get(`/api/v1/getAccIntroducers?page=1&per_page=100`)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });




  it("it should retrieve data for authenticated user", (done) => {

    chai
      .request(index)
      .get(`/api/v1/getAccIntroducers?page=1&per_page=100`)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        //  console.log("result:.....",   res.body);
        res.should.have.status(200);
        res.body.should.be.a("object");

        res.body.should.have.property("pre_page");
        res.body.should.have.property("next_page");

        res.body.page.should.not.null;
        res.body.per_page.should.not.null;
        res.body.total.should.not.null;
        res.body.total_pages.should.not.null;

        res.body.data.should.be.a("array");
        // console.log("data result:.....",   res.body.data[0]);
        res.body.data[0].should.have.property("ACCOUNTNO");
        res.body.data[0].should.have.property("ACCOUNTNAME");
        res.body.data[0].should.have.property("ACCOUNTTYPE");
        res.body.data[0].should.have.property("BALANCE");
        res.body.data[0].should.have.property("BRANCH");
        res.body.data[0].should.have.property("OPENDATE");
        res.body.data[0].should.have.property("CURRENCY");
        res.body.data[0].should.have.property("ACCOUNTMGR");
        res.body.data[0].should.have.property("STAFFID");

        done();
      });
  });


});




// --------------------------------------------------------------------------------------------------------------
// ---------GET /api/v1/getTopCustomersAvgVol?datefrom=01-jul-2018&dateto=31-jul-2018&page=1&per_page=100&export=0 --------
// --------------------------------------------------------------------------------------------------------------

// describe("/api/v1/getLimitNotification", () => {


//   it("it should not retreive any data for unauthorized user", done => {
//     chai
//       .request(index)
//       .get(`/api/v1/getTopCustomersAvgVol?datefrom=01-jul-2018&dateto=31-jul-2018&page=1&per_page=100&export=0`)
//       .end((err, res) => {
//         res.should.have.status(401);
//         res.body.should.be.a("object");
//         res.body.should.have.property("error");
//         done();
//       });
//   });

//   it("it should not retrieve any data for invalid date", done => {
//     chai
//       .request(index)
//       .get(`/api/v1/getTopCustomersAvgVol?datefrom=32-jul-2018&dateto=31-jan-2018&page=1&per_page=100&export=0`)
//       .set("x-access-token", userToken)
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.body.should.be.a("object");
//         res.body.should.have.property("error");
//         res.body.error.should.have.property("message").eql("Report not available for this search criteria");
//         done();
//       });
//   });


//   it("it should not retrieve any data for invalid date range", done => {
//     chai
//       .request(index)
//       .get(`/api/v1/getTopCustomersAvgVol?datefrom=01-jul-2018&dateto=31-jan-2018&page=1&per_page=100&export=0`)
//       .set("x-access-token", userToken)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("array").to.eql([]);
//          done();
//       });
//   });


//   it("it should retrieve data for valid request", (done) => {

//     chai
//       .request(index)
//       .get(`/api/v1/getTopCustomersAvgVol?datefrom=01-jul-2018&dateto=01-jul-2018&page=1&per_page=100&export=0`)
//       .set("x-access-token", userToken)
//       .end((err, res) => {

//         res.should.have.status(200);
//         res.body.should.be.a("object");

//         res.body.should.have.property("pre_page");
//         res.body.should.have.property("next_page");
//         res.body.page.should.not.null;
//         res.body.per_page.should.not.null;
//         res.body.total.should.not.null;
//         res.body.total_pages.should.not.null;

//         res.body.data.should.be.a("array");

//         res.body.data[0].should.have.property("Phone").not.empty;
//         res.body.data[0].should.have.property("Message").not.empty;
//         res.body.data[0].should.have.property("SMSDate").not.empty;
//         res.body.data[0].should.have.property("dlr_description").not.empty;
//         res.body.data[0].should.have.property("BranchCode").not.empty;
//         res.body.data[0].should.have.property("AccountNo").not.empty;
//         res.body.data[0].should.have.property("AccountName").not.empty;
//         res.body.data[0].should.have.property("SMSCount");

//         done();
//       });
//   });


// });





// --------------------------------------------------------------------------------------------------------------
// ---------GET /api/v1/getCallOver?dateFrom=05-Jan-2018&branchCode=004&staffId=08406 --------
// --------------------------------------------------------------------------------------------------------------

describe("/api/v1/getCallOver", () => {

  const selecteddate = "05-Jan-2018",
    branchCode = "004";

  it("it should not retreive any data for unauthorized user", done => {
    chai
      .request(index)
      .get(`/api/v1/getCallOver?selecteddate=${selecteddate}branchCode=${branchCode}`)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });

  it("it should not retrieve any data for invalid date", done => {
    chai
      .request(index)
      .get(`/api/v1/getCallOver?selecteddate=31-Feb-2016&branchCode=${branchCode}`)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        res.body.error.should.have.property("message").eql("Report not available for this search criteria");
        done();
      });
  });


  it("it should retrieve data for valid request", (done) => {

    chai
      .request(index)
      .get(`/api/v1/getCallOver?selecteddate=${selecteddate}&branchCode=${branchCode}`)
      .set("x-access-token", userToken)
      .end((_err, res) => {

        res.should.have.status(200);
        res.body.should.be.a("object");

        res.body.should.have.property("pre_page");
        res.body.should.have.property("next_page");

        res.body.page.should.not.null;
        res.body.per_page.should.not.null;
        res.body.total.should.not.null;
        res.body.total_pages.should.not.null;

        res.body.totalCredit.should.not.null;
        res.body.totalDebit.should.not.null;
        res.body.tellers.should.be.a("array").not.eql([]);

        res.body.data.should.be.a("array");
        res.body.data[0].should.have.property("FORACID").not.eql("");
        res.body.data[0].should.have.property("TRAN_TYPE").not.eql("");
        res.body.data[0].should.have.property("ACCT_NAME").not.eql("");
        res.body.data[0].should.have.property("TRAN_ID").not.eql("");
        res.body.data[0].should.have.property("PART_TRAN_SRL_NUM").not.eql("");
        res.body.data[0].should.have.property("CREDIT").not.eql("");
        res.body.data[0].should.have.property("DEBIT").not.eql("");
        res.body.data[0].should.have.property("NARRATION").not.eql("");
        res.body.data[0].should.have.property("TRAN_DATE").not.eql("");
        res.body.data[0].should.have.property("VALUE_DATE").not.eql("");
        res.body.data[0].should.have.property("INIT_SOL_ID").not.eql("");
        res.body.data[0].should.have.property("ENTRY_USER_ID").not.eql("");
        res.body.data[0].should.have.property("PSTD_USER_ID").not.eql("");
        res.body.data[0].should.have.property("VFD_USER_ID").not.eql("");
        res.body.data[0].should.have.property("PART_TRAN_TYPE").not.eql("");
        res.body.data[0].should.have.property("TRAN_SUB_TYPE").not.eql("");
        res.body.data[0].should.have.property("TRAN_PARTICULAR_2");

        done();
      });
  });


});
