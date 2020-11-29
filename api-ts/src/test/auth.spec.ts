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

const password = process.env.TEST_PASSWORD;

// describe("Test the behavior of addTwo()", ()=> {
//     it('should return 2 when given 1 and 1 via expect()', ()=> {
//         expect(2).to.be.equal(2)
//     })
//     it('should not return 3 when given 1 and 1 via should()', function () {
//         (1 + 1).should.not.be.equal(3)
//     })
// })

const url = "/api/v1/users/login";

// ---------------------------------------
// ---------POST /api/v1/users/login --------
// ---------------------------------------

describe(url, () => {
  it("it should not allow login for blank username or password", done => {
    const user = {
      username: "",
      password: ""
    };
    chai
      .request(index)
      .post(url)
      .send(user)
      .end((_err, res) => {

        expect(res.body).to.be.a("object");
        expect(res.status).eql(401);

        expect(res.body).eql(
          {
            error:
            {
              err: '',
              message: 'Authentication failed. Username/Password invalid'
            }
          }
        );

        done();
      });
  });

  it("it should not allow login for incorrect username or password", done => {
    const user = {
      username: "ishmael.gyaban",
      password: "1234"
    };
    chai
      .request(index)
      .post(url)
      .send(user)
      .end((_err, res) => {

        expect(res.body).to.be.a("object");
        expect(res.status).eql(401);
        expect(res.body.error.message).eql('Authentication failed. Username/Password invalid');

        done();
      });
  });
  it("it should allow login for correct username or password", done => {
    const user = {
      username: "ishmael.gyaban",
      password: password
    };
    chai
      .request(index)
      .post(url)
      .send(user)
      .end((_err, res) => {
      
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("token").not.eql("");
        res.body.should.have.property("user").not.eql("");
        res.body.user.should.have.property("sAMAccountName").not.eql("");
        res.body.user.should.have.property("displayName").not.eql("");
        res.body.user.should.have.property("title");
        res.body.user.should.have.property("department");
        res.body.user.should.have.property("mail").not.eql("");
        res.body.user.should.have.property("mobile");
        res.body.user.should.have.property("middleName").not.eql("");
        res.body.user.should.have.property("company").not.eql("");
        res.body.user.should.have.property("branch").not.eql("");
        res.body.user.should.have.property("grade");

        res.body.menu.should.be.a("Array");

        res.body.scopeLevel.should.be.a("object");
        res.body.scopeLevel.should.have.property("branchcode").not.null;
        res.body.scopeLevel.should.have.property("regioncode").not.null;
        res.body.accessLevels.should.be.a("Array");
        res.body.should.have.property("accessLevels");
        res.body.accessLevels[0].should.have.property("access_level").not.null;
        res.body.accessLevels[0].should.have.property("module").not.null;

        done();
      });
  });
});



