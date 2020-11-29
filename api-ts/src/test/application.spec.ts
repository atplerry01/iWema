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
const assert = chai.assert;
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



// -----------------------
// --------- MENU --------
// -----------------------

describe("Main Menu", () => {

  let idno: number;

  it("it should be able to add menu item", (done) => {

    const body = {
      menu_id: 'test1', 
      menu_name: 'test name',
      menu_order: 10,
      menu_image: null,
      menu_link: 'http://google.com',
      standalone: 'Y',
      status: 'N',
      menu_display_inside: 'N'
    };

    chai
      .request(index)
      .post('/api/v1/add_menu_item')
      .send(body)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        //  console.log("result:.....",   res.body);
          res.should.have.status(201);
          res.body.should.be.a("object");
          const result = res.body;
          assert.isTrue(result.success);
          assert.isNumber(result.idno);
          idno = result.idno;

        done();
      });
  });


  it("it should be able to update menu item", (done) => {

    const body = {
      menu_id: 'test1', 
      menu_name: 'test name updated',
      menu_order: 10,
      menu_image: null,
      menu_link: 'http://google.com/updated',
      standalone: 'Y',
      status: 'N',
      menu_display_inside: 'N'
    };

    chai
      .request(index)
      .put('/api/v1/update_menu_item/' + idno)
      .send(body)
      .set("x-access-token", userToken)
      .end((_err, res) => {
          // console.log("result:.....",   res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          assert.isTrue(res.body.success);

        done();
      });
  });


  
  it("it should be able to delete menu item", (done) => {
    chai
      .request(index)
      .del('/api/v1/delete_menu_item/' + idno)
      .set("x-access-token", userToken)
      .end((_err, res) => {
         // console.log("result:.....",   res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          assert.isTrue(res.body.success);
        done();
      });
  });


});



// -----------------------
// --------- SUB-MENU --------
// -----------------------

describe("Sub-Menu", () => {

  const submenu_id = 'test1112';
  const menu_id = 'M005';

  it("it should be able to add sub-menu item", (done) => {

    const body = {
      submenu_id: submenu_id, 
      menu_id: menu_id, 
      submenu_name: 'sub test name',
      submenu_link: 'http://google.com/',
      submenu_display_inside: 'N',
      submenu_order: 11,
      favourite_status: 'N',
      status: 'N',
      favourite_order: null
    };

    chai
      .request(index)
      .post('/api/v1/add_menu_subs')
      .send(body)
      .set("x-access-token", userToken)
      .end((_err, res) => {
         // console.log("result:.....",   res.body);
          res.should.have.status(201);
          res.body.should.be.a("object");
          const result = res.body;
          assert.isTrue(result.success);
          assert.isNumber(result.idno);

        done();
      });
  });


  it("it should be able to update sub-menu item", (done) => {

    const body = {
      menu_id: menu_id, 
      submenu_name: 'sub test name updated',
      submenu_link: 'http://google.com/updated',
      submenu_display_inside: 'N',
      submenu_order: 11,
      favourite_status: 'N',
      status: 'N',
      favourite_order: null
    };

    chai
      .request(index)
      .put('/api/v1/update_menu_subs/' + submenu_id)
      .send(body)
      .set("x-access-token", userToken)
      .end((_err, res) => {
          //  console.log("result:.....",   res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          assert.isTrue(res.body.success);

        done();
      });
  });


  
  it("it should be able to delete sub-menu item", (done) => {
    chai
      .request(index)
      .del('/api/v1/delete_menu_subs/' + submenu_id)
      .set("x-access-token", userToken)
      .end((_err, res) => {
         // console.log("result:.....",   res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          assert.isTrue(res.body.success);
        done();
      });
  });


});



// -----------------------
// --------- ROLE --------
// -----------------------

describe("ROLE", () => {

  const roleid = 'roleid1';

  it("it should be able to add role", (done) => {

    const body = {
      roleid: roleid, 
      role_name: 'test role name',
      status: 'N'
    };

    chai
      .request(index)
      .post('/api/v1/add_role')
      .send(body)
      .set("x-access-token", userToken)
      .end((_err, res) => {
         // console.log("result:.....",   res.body);
          res.should.have.status(201);
          res.body.should.be.a("object");
          const result = res.body;
          assert.isTrue(result.success);
          assert.isNumber(result.idno);

        done();
      });
  });


  it("it should be able to update role", (done) => {

    const body = {
      role_name: 'test role name updated',
      status: 'N'
    };
    chai
      .request(index)
      .put('/api/v1/update_role/' + roleid)
      .send(body)
      .set("x-access-token", userToken)
      .end((_err, res) => {
          // console.log("result:.....",   res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          assert.isTrue(res.body.success);

        done();
      });
  });


  
  it("it should be able to delete role", (done) => {
    chai
      .request(index)
      .del('/api/v1/delete_role/' + roleid)
      .set("x-access-token", userToken)
      .end((_err, res) => {
         // console.log("result:.....",   res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          assert.isTrue(res.body.success);
        done();
      });
  });


});



// ---------------------------------
// --------- MENU ITEM ROLE --------
// ---------------------------------

describe("MENU ITEM ROLE", () => {

  const roleid = 'GENERAL';
  let idno: number;

  it("it should be able to add menu item role", (done) => {

    const body = {
      roleid: roleid, 
      submenu_id: 'SB001',
      access_level_id: 'G',
      status: 'Y'
    };

    chai
      .request(index)
      .post('/api/v1/add_menu_items_Roles')
      .send(body)
      .set("x-access-token", userToken)
      .end((_err, res) => {
         // console.log("result:.....",   res.body);
          res.should.have.status(201);
          res.body.should.be.a("object");
          const result = res.body;
          assert.isTrue(result.success);
          assert.isNumber(result.idno);
          idno = result.idno;

        done();
      });
  });


  it("it should be able to update menu item role", (done) => {

    const body = {
      roleid: roleid,
      access_level_id: 'B',
      status: 'N'
    };

    chai
      .request(index)
      .put('/api/v1/update_menu_items_Roles/' + idno)
      .send(body)
      .set("x-access-token", userToken)
      .end((_err, res) => {
          // console.log("result:.....",   res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          assert.isTrue(res.body.success);

        done();
      });
  });


  
  it("it should be able to delete menu item role", (done) => {
    chai
      .request(index)
      .del('/api/v1/delete_menu_items_Roles/' + idno)
      .set("x-access-token", userToken)
      .end((_err, res) => {
         // console.log("result:.....",   res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          assert.isTrue(res.body.success);
        done();
      });
  });


});


// -----------------------------------------
// --------- MENU ITEM SPECIAL ROLE --------
// -----------------------------------------

describe("MENU ITEM SPECIAL ROLE", () => {

  let idno: number;

  it("it should be able to add menu item special role", (done) => {

    const body = {
      userid: 'ishmael.gyaban', 
      submenu_id: 'SB001',
      access_level_id: 'G',
      status: 'Y'
    };

    chai
      .request(index)
      .post('/api/v1/add_menu_items_SpecialRoles')
      .send(body)
      .set("x-access-token", userToken)
      .end((_err, res) => {
         // console.log("result:.....",   res.body);
          res.should.have.status(201);
          res.body.should.be.a("object");
          const result = res.body;
          assert.isTrue(result.success);
          assert.isNumber(result.idno);
          idno = result.idno;

        done();
      });
  });


  it("it should be able to update menu item special role", (done) => {

    const body = {
      userid: 'ishmael.gyaban', 
      submenu_id: 'SB001',
      access_level_id: 'B',
      status: 'N'
    };

    chai
      .request(index)
      .put('/api/v1/update_menu_items_SpecialRoles/' + idno)
      .send(body)
      .set("x-access-token", userToken)
      .end((_err, res) => {
          // console.log("result:.....",   res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          assert.isTrue(res.body.success);

        done();
      });
  });


  
  it("it should be able to delete menu item special role", (done) => {
    chai
      .request(index)
      .del('/api/v1/delete_menu_items_SpecialRoles/' + idno)
      .set("x-access-token", userToken)
      .end((_err, res) => {
         // console.log("result:.....",   res.body);
          res.should.have.status(200);
          res.body.should.be.a("object");
          assert.isTrue(res.body.success);
        done();
      });
  });


});



// -----------------------------------------------------------------------------------------------------------------------------
// ---------GET /api/v1/roles?id= --------
// -----------------------------------------------------------------------------------------------------------------------------

describe("/api/v1/roles", () => {

  it("it should not retreive submenu roles for unauthorized user", done => {
    chai
      .request(index)
      .get('/api/v1/roles')
      .end((_err, res) => {
        res.should.have.status(401);
        res.body.should.be.a("object");
        res.body.should.have.property("error");
        done();
      });
  });


  it("it should retrieve all roles", (done) => {

    chai
      .request(index)
      .get('/api/v1/roles')
      .set("x-access-token", userToken)
      .end((_err, res) => {
       //  console.log("result:.....",   res.body[0]);
         res.should.have.status(200);
         res.body.should.be.a("array");

         res.body[0].should.have.property("idno").not.null;
         res.body[0].should.have.property("roleid").not.empty;
         res.body[0].should.have.property("role_name").not.empty;
         res.body[0].should.have.property("status").not.empty;

        done();
      });
  });

  it("it should retrieve single role", (done) => {

    chai
      .request(index)
      .get('/api/v1/roles?id=R001')
      .set("x-access-token", userToken)
      .end((_err, res) => {
        //  console.log("result:.....",   res.body);
         res.should.have.status(200);
         res.body.should.be.a("array");

         res.body[0].should.have.property("idno").not.null;
         res.body[0].should.have.property("roleid").not.empty;
         res.body[0].should.have.property("role_name").not.empty;
         res.body[0].should.have.property("status").not.empty;

        done();
      });
  });


});



// -----------------------------------------------------------------------------------------------------------------------------
// ---------GET /api/v1/submenuroles/SB002 --------
// -----------------------------------------------------------------------------------------------------------------------------

describe("/api/v1/submenuroles", () => {

  const url = '/api/v1/submenuroles/SB002';

  it("it should not retreive submenu roles for unauthorized user", done => {
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


  it("it should retrieve submenu roles", (done) => {

    chai
      .request(index)
      .get(url)
      .set("x-access-token", userToken)
      .end((_err, res) => {
        // console.log("result:.....",   res.body);
         res.should.have.status(200);
         res.body.should.be.a("object");

         const roles = res.body.roles;
         const speccialRoles = res.body.specialRoles;
         roles.should.be.a("array");
         speccialRoles.should.be.a("array");

         roles[0].should.have.property("idno").not.null;
         roles[0].should.have.property("roleid").not.empty;
         roles[0].should.have.property("submenu_id").not.empty;
         roles[0].should.have.property("access_level_id").not.empty;
         roles[0].should.have.property("status").not.empty;

         speccialRoles[0].should.have.property("idno").not.null;
         speccialRoles[0].should.have.property("userid").not.empty;
         speccialRoles[0].should.have.property("submenu_id").not.empty;
         speccialRoles[0].should.have.property("access_level_id").not.empty;
         speccialRoles[0].should.have.property("status").not.empty;

        done();
      });
  });

});

