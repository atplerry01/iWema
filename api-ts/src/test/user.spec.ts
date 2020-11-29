// mock library like Sinon.js

// tslint:disable:no-unused-expression


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
      expect(userToken).not.undefined;
      done();
    });
});



// -------------------------------------------
// ---------GET /api/v1/users/:username --------
// -------------------------------------------
// username=> username in Active directory. e.g. ishmael.gyaban

describe("/api/v1/checkConfidentialityDeclaration", () => {

  it("it should retrievet 0 or 1", done => {
    chai
      .request(index)
      .get("/api/v1/checkConfidentialityDeclaration")
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(200);
        expect(res).not.null;
        done();
      });
  });

  it("it should insert confidentiall declaration successfully", done => {

    chai
      .request(index)
      .post("/api/v1/acceptConfidentialityDeclaration")
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(200);
        
       expect(res.body).eql(1);

        done();
      });
  });

});



// -------------------------------------------
// ---------GET /api/v1/users/:username --------
// -------------------------------------------
// username=> username in Active directory. e.g. ishmael.gyaban

describe("/api/v1/users/:username", () => {
  it("it should not retreive any details for unauthorized user", done => {
    const username = "ishmael.gyaban";
    chai
      .request(index)
      .get("/api/v1/users/" + username)
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });

  it("it should not retrieve any detail for invalid username", done => {
    const username = "john";
    chai
      .request(index)
      .get("/api/v1/users/" + username)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(400);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        res.body.error.should.have.property("message").eql("No user found");
        done();
      });
  });
  it("it should retrieve user details for correct username", done => {
    const username = "ishmael.gyaban";
    chai
      .request(index)
      .get("/api/v1/users/" + username)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("sAMAccountName").not.eql("");
        res.body.should.have.property("displayName").not.eql("");
        res.body.should.have.property("title");
        res.body.should.have.property("department");
        res.body.should.have.property("mail").not.eql("");
        res.body.should.have.property("mobile");
        res.body.should.have.property("middleName").not.eql("");
        res.body.should.have.property("company").not.eql("");
        res.body.should.have.property("branch").not.eql("");
        res.body.should.have.property("grade");

        done();
      });
  });
});



// -------------------------------------------
// ---------GET /api/v1/getBranchNetwork?drilldownLevel=B&code=1223 --------
// -------------------------------------------
// username=> username in Active directory. e.g. ishmael.gyaban
const getBranchNetworkUrl = (dl, code) => `/api/v1/getBranchNetwork?drilldownLevel=${dl}&code=${code}`;
describe("/api/v1/getBranchNetwork", () => {
  it("it should not retreive branch details for unauthorized user", done => {

    chai
      .request(index)
      .get(getBranchNetworkUrl("B", "003"))
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });

  it("it should not retrieve branches under zone for invalid zone code", done => {

    chai
      .request(index)
      .get(getBranchNetworkUrl("B", "000043444"))
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.should.have.lengthOf(0);

        done();
      });
  });
  it("it should retrieve branches under zone for correct zone code", done => {

    chai
      .request(index)
      .get(getBranchNetworkUrl("B", "3046"))
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0].should.have.property("BranchCode").not.eql("");
        res.body[0].should.have.property("BranchName").not.eql("");
        res.body[0].should.have.property("Address").not.eql("");
        res.body[0].should.have.property("State").not.eql("");
        res.body[0].should.have.property("LineNumber").not.eql("");

        done();
      });
  });


  it("it should not retrieve zones under region for invalid region code", done => {

    chai
      .request(index)
      .get(getBranchNetworkUrl("Z", "000043444"))
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.should.have.lengthOf(0);

        done();
      });
  });
  it("it should retrieve zones under region for correct region code", done => {

    chai
      .request(index)
      .get(getBranchNetworkUrl("Z", "1301"))
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0].should.have.property("ZoneName").not.eql("");
        res.body[0].should.have.property("ZoneCode").not.eql("");
        res.body[0].should.have.property("TotalBranches").not.eql("");
        // console.log(" res.body[0]:",  res.body[0]);

        done();
      });
  });

  it("it should retrieve branch network summary without parameters", done => {

    chai
      .request(index)
      .get(getBranchNetworkUrl("", ""))
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body[0].should.have.property("RegionName").not.eql("");
        res.body[0].should.have.property("RegionCode").not.eql("");
        res.body[0].should.have.property("TotalZones").not.eql("");
        res.body[0].should.have.property("TotalBranches").not.eql("");

        done();
      });
  });

});



// -------------------------------------------
// ---------GET /api/v1/me --------
// -------------------------------------------

describe("/api/v1/me", () => {
  it("it should get current login user details", done => {

    chai
      .request(index)
      .get("/api/v1/me")
      .set("x-access-token", userToken)
      .end((_err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");

        res.body.should.have.property("data").not.eql("");
        res.body.data.should.be.a("object");
        res.body.data.should.have.property("dn").not.eql("");
        res.body.data.should.have.property("sAMAccountName").not.eql("");
        res.body.data.should.have.property("displayName").not.eql("");
        res.body.data.should.have.property("givenName").not.eql("");
        res.body.data.should.have.property("sn").not.eql("");
        res.body.data.should.have.property("title").not.eql("");
        res.body.data.should.have.property("department").not.eql("");
        res.body.data.should.have.property("mail").not.eql("");
        res.body.data.should.have.property("mobile").not.eql("");
        res.body.data.should.have.property("middleName").not.eql("");
        res.body.data.should.have.property("physicalDeliveryOfficeName").not.eql("");
        res.body.data.should.have.property("company").not.eql("");
        res.body.data.should.have.property("branch").not.eql("");
        res.body.data.should.have.property("grade").not.eql("");


        res.body.should.have.property("scopeLevel");
        res.body.scopeLevel.should.be.a("object");
        res.body.scopeLevel.should.have.property("branchcode").not.eql("");
        res.body.scopeLevel.should.have.property("zonecode").not.eql("");
        res.body.scopeLevel.should.have.property("regioncode").not.eql("");

        res.body.should.have.property("accessLevels");
        res.body.accessLevels.should.be.a("array");
        res.body.accessLevels[0].should.have.property("access_level").not.eql("");
        res.body.accessLevels[0].should.have.property("module").not.eql("");


        // console.log(" res.body:",  res.body);
        done();
      });
  });


});



// ----------------------------------------------------------
// ---------GET /api/v1/searchAccountByAccName/:accname --------
// ----------------------------------------------------------
// accname=> it can be any part of the name. e.g. firstname or lastname or both

// describe("/api/v1/searchAccountByAccName/:accname", () => {
//   it("it should not retreive any details for unauthorized user", done => {
//     const accname = "ishmael.gyaban";
//     chai
//       .request(index)
//       .get("/api/v1/searchAccountByAccName/" + accname)
//       .end((err, res) => {
//          res.should.have.status(401);
//          res.body.should.be.a("object");
//          res.body.should.have.property("error");
//         done();
//       });
//   });

//   it("it should not retrieve any detail for non-existing name", done => {
//     const accname = "john";
//     chai
//       .request(index)
//       .get("/api/v1/searchAccountByAccName/" + accname)
//       .set("x-access-token", userToken)
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.body.should.be.a("object");
//         res.body.should.have.property("error");
//         res.body.error.should.have.property("message").eql("No user found");
//         done();
//       });
//   });
//   it("it should retrieve user details for correct username", done => {
//     const accname = "ishmael.gyaban";
//     chai
//       .request(index)
//       .get("/api/v1/searchAccountByAccName/" + accname)
//       .set("x-access-token", userToken)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("object");
//         res.body.should.have.property("sAMAccountName").not.eql("");
//         res.body.should.have.property("displayName").not.eql("");
//         res.body.should.have.property("title");
//         res.body.should.have.property("department");
//         res.body.should.have.property("mail").not.eql("");
//         res.body.should.have.property("mobile");
//         res.body.should.have.property("middleName").not.eql("");
//         res.body.should.have.property("company").not.eql("");
//         res.body.should.have.property("branch").not.eql("");
//         res.body.should.have.property("grade");

//         done();
//       });
//   });
// });



// //----------------------------------------------------------
// //---------GET /api/v1/getCustomerAccounts?accno=00000000&ownaccount=1/2 --------
// //----------------------------------------------------------
// //ownaccount===1=> get logged in user own account details
// //ownaccount===2=> get other customer account details

// describe("/api/v1/searchAccountByAccName/:accname", () => {
//   it("it should not retreive any details for unauthorized user", done => {
//     const accno = "00000000";
//     chai
//       .request(index)
//       .get(`/api/v1/getCustomerAccounts?accno=${accno}&ownaccount=1`)
//       .end((err, res) => {
//          res.should.have.status(401);
//          res.body.should.be.a("object");
//          res.body.should.have.property("error");
//         done();
//       });
//   });

//   it("it should not retrieve any detail for non-existing name", done => {
//     const accname = "john";
//     chai
//       .request(index)
//       .get("/api/v1/searchAccountByAccName/" + accname)
//       .set("x-access-token", userToken)
//       .end((err, res) => {
//         res.should.have.status(400);
//         res.body.should.be.a("object");
//         res.body.should.have.property("error");
//         res.body.error.should.have.property("message").eql("No user found");
//         done();
//       });
//   });
//   it("it should retrieve user details for correct username", done => {
//     const accname = "ishmael.gyaban";
//     chai
//       .request(index)
//       .get("/api/v1/searchAccountByAccName/" + accname)
//       .set("x-access-token", userToken)
//       .end((err, res) => {
//         res.should.have.status(200);
//         res.body.should.be.a("object");
//         res.body.should.have.property("sAMAccountName").not.eql("");
//         res.body.should.have.property("displayName").not.eql("");
//         res.body.should.have.property("title");
//         res.body.should.have.property("department");
//         res.body.should.have.property("mail").not.eql("");
//         res.body.should.have.property("mobile");
//         res.body.should.have.property("middleName").not.eql("");
//         res.body.should.have.property("company").not.eql("");
//         res.body.should.have.property("branch").not.eql("");
//         res.body.should.have.property("grade");

//         done();
//       });
//   });
// });
