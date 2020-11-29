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
// ---------GET /api/v1/getFixedDeposit?startDate=09-aug-2018&endDate=10-aug-2018&accountNo=&branchCode=&page=1&per_page=100&export= --------
// -----------------------------------------------------------------------------------------------------------------------------

describe("/api/v1/getFixedDeposit", () => {

  let url = '/api/v1/getFixedDeposit?startDate=09-aug-2018&endDate=10-aug-2018&accountNo=&branchCode=&page=1&per_page=100&export=';

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
  
  it("it should pull Fixed Deposit report with date range only", (done) => {

    chai
      .request(index)
      .get(url) // tracm = current month 
      .set("x-access-token", userToken)
      .end((_err, res) => {
       //  console.log("result1:.....",   res.body);
         res.should.have.status(200);
         res.body.should.be.a("object");

        //  expect(res.body.page).eql(1);
        //  expect(res.body.per_page).eql(100);
        //  expect(res.body.total).not.null;
        //  expect(res.body.total_pages).not.null;         

         res.body.data[0].should.have.property("SCHM_CODE").not.empty;
         res.body.data[0].should.have.property("PRODUCTNAME").not.empty;
         res.body.data[0].should.have.property("BRANCHNAME").not.null;
         res.body.data[0].should.have.property("BRANCHCODE").not.empty;
         res.body.data[0].should.have.property("ACCOUNTNO").not.empty;
         res.body.data[0].should.have.property("CUSTOMERID").not.empty;
         res.body.data[0].should.have.property("CUSTOMERNAME").not.empty;
         res.body.data[0].should.have.property("DATEOPENED").not.empty;
         res.body.data[0].should.have.property("TENOR").not.null;
         res.body.data[0].should.have.property("DEPOSIT_PERIOD_MTHS").not.null;
         res.body.data[0].should.have.property("TRUE_TENOR").not.null;
         res.body.data[0].should.have.property("MATURITYDATE").not.empty;
         res.body.data[0].should.have.property("ACCT_CRNCY_CODE").not.empty;
         res.body.data[0].should.have.property("DEPOSITAMOUNT").not.null;
         res.body.data[0].should.have.property("INTERESTRATE");
         res.body.data[0].should.have.property("CLEAREDBALANCE").not.null;
         res.body.data[0].should.have.property("INTERESTPAYABLE").not.null;
         res.body.data[0].should.have.property("LAST_TRAN_DATE").not.empty;
         res.body.data[0].should.have.property("ACCT_CLS_DATE");
         res.body.data[0].should.have.property("DepositStatus").not.empty;

        done();
      });
  });

  it("it should pull Fixed Deposit report with date range and branch only", (done) => {
    
    url = '/api/v1/getFixedDeposit?startDate=09-aug-2018&endDate=10-aug-2018&accountNo=&branchCode=999&page=1&per_page=100&export=';
    
    chai
      .request(index)
      .get(url) // tracm = current month 
      .set("x-access-token", userToken)
      .end((_err, res) => {
        // console.log("result2:.....",   res.body);
         res.should.have.status(200);
         res.body.should.be.a("object");

        //  expect(res.body.page).eql(1);
        //  expect(res.body.per_page).eql(100);
        //  expect(res.body.total).not.null;
        //  expect(res.body.total_pages).not.null;         

         res.body.data[0].should.have.property("SCHM_CODE").not.empty;
         res.body.data[0].should.have.property("PRODUCTNAME").not.empty;
         res.body.data[0].should.have.property("BRANCHNAME").not.null;
         res.body.data[0].should.have.property("BRANCHCODE").not.empty;
         res.body.data[0].should.have.property("ACCOUNTNO").not.empty;
         res.body.data[0].should.have.property("CUSTOMERID").not.empty;
         res.body.data[0].should.have.property("CUSTOMERNAME").not.empty;
         res.body.data[0].should.have.property("DATEOPENED").not.empty;
         res.body.data[0].should.have.property("TENOR").not.null;
         res.body.data[0].should.have.property("DEPOSIT_PERIOD_MTHS").not.null;
         res.body.data[0].should.have.property("TRUE_TENOR").not.null;
         res.body.data[0].should.have.property("MATURITYDATE").not.empty;
         res.body.data[0].should.have.property("ACCT_CRNCY_CODE").not.empty;
         res.body.data[0].should.have.property("DEPOSITAMOUNT").not.null;
         res.body.data[0].should.have.property("INTERESTRATE");
         res.body.data[0].should.have.property("CLEAREDBALANCE").not.null;
         res.body.data[0].should.have.property("INTERESTPAYABLE").not.null;
         res.body.data[0].should.have.property("LAST_TRAN_DATE").not.empty;
         res.body.data[0].should.have.property("ACCT_CLS_DATE");
         res.body.data[0].should.have.property("DepositStatus").not.empty;

        done();
      });
  });

  it("it should pull Fixed Deposit report with date range and account no", (done) => {

    url = '/api/v1/getFixedDeposit?startDate=09-aug-2018&endDate=10-aug-2018&accountNo=0702787768&branchCode=&page=1&per_page=100&export=';

    chai
      .request(index)
      .get(url) // tracm = current month 
      .set("x-access-token", userToken)
      .end((_err, res) => {
        // console.log("result3:.....",   res.body);
         res.should.have.status(200);
         res.body.should.be.a("object");

        //  expect(res.body.page).eql(1);
        //  expect(res.body.per_page).eql(100);
        //  expect(res.body.total).not.null;
        //  expect(res.body.total_pages).not.null;         


         res.body.data[0].should.have.property("SCHM_CODE").not.empty;
         res.body.data[0].should.have.property("PRODUCTNAME").not.empty;
         res.body.data[0].should.have.property("BRANCHNAME").not.null;
         res.body.data[0].should.have.property("BRANCHCODE").not.empty;
         res.body.data[0].should.have.property("ACCOUNTNO").not.empty;
         res.body.data[0].should.have.property("CUSTOMERID").not.empty;
         res.body.data[0].should.have.property("CUSTOMERNAME").not.empty;
         res.body.data[0].should.have.property("DATEOPENED").not.empty;
         res.body.data[0].should.have.property("TENOR").not.null;
         res.body.data[0].should.have.property("DEPOSIT_PERIOD_MTHS").not.null;
         res.body.data[0].should.have.property("TRUE_TENOR").not.null;
         res.body.data[0].should.have.property("MATURITYDATE").not.empty;
         res.body.data[0].should.have.property("ACCT_CRNCY_CODE").not.empty;
         res.body.data[0].should.have.property("DEPOSITAMOUNT").not.null;
         res.body.data[0].should.have.property("INTERESTRATE");
         res.body.data[0].should.have.property("CLEAREDBALANCE").not.null;
         res.body.data[0].should.have.property("INTERESTPAYABLE").not.null;
         res.body.data[0].should.have.property("LAST_TRAN_DATE").not.empty;
         res.body.data[0].should.have.property("ACCT_CLS_DATE");
         res.body.data[0].should.have.property("DepositStatus").not.empty;

        done();
      });
  });

  it("it should pull Fixed Deposit report with date range, branchcode, accountNo", (done) => {

    url = '/api/v1/getFixedDeposit?startDate=09-aug-2018&endDate=10-aug-2018&accountNo=0702787768&branchCode=999&page=1&per_page=100&export=';

    chai
      .request(index)
      .get(url) // tracm = current month 
      .set("x-access-token", userToken)
      .end((_err, res) => {
       //  console.log("result4:.....",   res.body);
         res.should.have.status(200);
         res.body.should.be.a("object");

        //  expect(res.body.page).eql(1);
        //  expect(res.body.per_page).eql(100);
        //  expect(res.body.total).not.null;
        //  expect(res.body.total_pages).not.null;         

          res.body.data[0].should.have.property("SCHM_CODE").not.empty;
          res.body.data[0].should.have.property("PRODUCTNAME").not.empty;
          res.body.data[0].should.have.property("BRANCHNAME").not.null;
          res.body.data[0].should.have.property("BRANCHCODE").not.empty;
          res.body.data[0].should.have.property("ACCOUNTNO").not.empty;
          res.body.data[0].should.have.property("CUSTOMERID").not.empty;
          res.body.data[0].should.have.property("CUSTOMERNAME").not.empty;
          res.body.data[0].should.have.property("DATEOPENED").not.empty;
          res.body.data[0].should.have.property("TENOR").not.null;
          res.body.data[0].should.have.property("DEPOSIT_PERIOD_MTHS").not.null;
          res.body.data[0].should.have.property("TRUE_TENOR").not.null;
          res.body.data[0].should.have.property("MATURITYDATE").not.empty;
          res.body.data[0].should.have.property("ACCT_CRNCY_CODE").not.empty;
          res.body.data[0].should.have.property("DEPOSITAMOUNT").not.null;
          res.body.data[0].should.have.property("INTERESTRATE");
          res.body.data[0].should.have.property("CLEAREDBALANCE").not.null;
          res.body.data[0].should.have.property("INTERESTPAYABLE").not.null;
          res.body.data[0].should.have.property("LAST_TRAN_DATE").not.empty;
          res.body.data[0].should.have.property("ACCT_CLS_DATE");
          res.body.data[0].should.have.property("DepositStatus").not.empty;

        done();
      });
  });


});




