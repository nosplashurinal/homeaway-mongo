process.env.NODE_ENV = "test";

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

describe("Login", () => {
  it("Login ", done => {
    let email = "kailash@kailash.com";
    let password = "admin";
    chai
      .request("http://localhost:3001")
      .post("/Login")
      .send({ email: email, password: password })
      .end(function(err, res) {
        jwt = "JWT " + res.body.token;
        res.status.should.be.equal(200);
        done();
      });
  });
});

describe("PropertyList", () => {
  it("it should GET a property by id ", done => {
    chai
      .request("http://localhost:3001")
      .get("/PropertyList")
      .query({ location: "San+Francisco" })
      .end(function(err, res) {
        res.status.should.be.equal(200);
        res.body.should.be.a("object");
        done();
      });
  });
});
