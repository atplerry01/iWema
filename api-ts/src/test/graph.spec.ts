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
const validProducttype = "Savings";
const invalidProducttype = "mycumstomproductsss";
const validRegioncode = "1301";
const invalidRegioncode = "13143dd";
const validZoneCode = "1383";
const invalidZoneCode = "1383adffddf";

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







// -------------------------------------------
// ---------GET /api/v1/getAccountStatiticsByRegionGraph/Savings --------
// -------------------------------------------

describe("/api/v1/getAccountStatiticsByRegionGraph/:producttype", () => {



  it("it should not retreive any data for unauthorized user", done => {
    chai
      .request(index)
      .get("/api/v1/getAccountStatiticsByRegionGraph/" + validProducttype)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });

  it("it should not retrieve any data for invalid product type", done => {
    chai
      .request(index)
      .get("/api/v1/getAccountStatiticsByRegionGraph/" + invalidProducttype)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        res.body.error.should.have.property("message").eql("Report not available for this search criteria");
        done();
      });
  });
  it("it should retrieve data for valid product type", done => {

    chai
      .request(index)
      .get("/api/v1/getAccountStatiticsByRegionGraph/" + validProducttype)
      .set("x-access-token", userToken)
      .end((_err, res) => {

        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0].should.have.property("RegionCode").not.eql("");
        res.body[0].should.have.property("ProductType").not.eql("");
        res.body[0].should.have.property("RegionName").not.eql("");
        res.body[0].should.have.property("TotalDormant").not.eql("");
        res.body[0].should.have.property("Total").not.eql("");
        res.body[0].should.have.property("DVolume").not.eql("");

        done();
      });
  });
});



// -------------------------------------------
// ---------GET /api/v1/getAccountStatiticsByZones?producttype=Savings&regioncode=1314 --------
// -------------------------------------------

describe("/api/v1/getAccountStatiticsByZonesGraph", () => {


  it("it should not retreive any data for unauthorized user", done => {
    chai
      .request(index)
      .get(`/api/v1/getAccountStatiticsByZonesGraph?producttype=${validProducttype}&regioncode=${validRegioncode}`)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });

  it("it should not retrieve any data for invalid product type and valid region", done => {
    chai
      .request(index)
      .get(`/api/v1/getAccountStatiticsByZonesGraph?producttype=${invalidProducttype}&regioncode=${validRegioncode}`)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        res.body.error.should.have.property("message").eql("Report not available for this search criteria");
        done();
      });
  });

  it("it should not retrieve any data for valid product type and invalid region", done => {
    chai
      .request(index)
      .get(`/api/v1/getAccountStatiticsByZonesGraph?producttype=${validProducttype}&regioncode=${invalidRegioncode}`)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.eql([]);
        done();
      });
  });

  it("it should retrieve data for valid product type and region", (done) => {

    chai
      .request(index)
      .get(`/api/v1/getAccountStatiticsByZonesGraph?producttype=${validProducttype}&regioncode=${validRegioncode}`)
      .set("x-access-token", userToken)
      .end((_err, res) => {

        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0].should.have.property("ZoneCode").not.eql("");
        res.body[0].should.have.property("ZoneName").not.eql("");
        res.body[0].should.have.property("BranchName").not.eql("");
        res.body[0].should.have.property("ProductType").not.eql("");
        res.body[0].should.have.property("Dormancy").not.eql("");
        res.body[0].should.have.property("DTotal").not.eql("");
        res.body[0].should.have.property("DVolume").not.eql("");

        done();
      });
  });
});






// -------------------------------------------
// ---------GET /api/v1/getAccountStatiticsByBranches?producttype=Savings&zonecode=1314 --------
// -------------------------------------------

describe("/api/v1/getAccountStatiticsByBranches", () => {


  it("it should not retreive any data for unauthorized user", done => {
    chai
      .request(index)
      .get(`/api/v1/getAccountStatiticsByBranches?producttype=${validProducttype}&zonecode=${validZoneCode}`)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });

  it("it should not retrieve any data for invalid product type and valid zone", done => {
    chai
      .request(index)
      .get(`/api/v1/getAccountStatiticsByBranches?producttype=${invalidProducttype}&zonecode=${validZoneCode}`)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        res.body.error.should.have.property("message").eql("Report not available for this search criteria");
        done();
      });
  });

  it("it should not retrieve any data for valid product type and invalid zone", done => {
    chai
      .request(index)
      .get(`/api/v1/getAccountStatiticsByBranches?producttype=${validProducttype}&zonecode=${invalidZoneCode}`)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        res.body.error.should.have.property("message").eql("Report not available for this search criteria");
        done();
      });
  });

  it("it should retrieve data for valid product type and zone", (done) => {

    chai
      .request(index)
      .get(`/api/v1/getAccountStatiticsByBranches?producttype=${validProducttype}&zonecode=${validZoneCode}`)
      .set("x-access-token", userToken)
      .end((_err, res) => {

        res.should.have.status(200);
        res.body.should.be.a("array");

        res.body[0].should.have.property("ZoneCode").not.eql("");
        res.body[0].should.have.property("ZoneName").not.eql("");
        res.body[0].should.have.property("BranchName").not.eql("");
        res.body[0].should.have.property("ProductType").not.eql("");
        res.body[0].should.have.property("Dormancy").not.eql("");
        res.body[0].should.have.property("DTotal").not.eql("");
        res.body[0].should.have.property("DVolume").not.eql("");

        done();
      });
  });


});
