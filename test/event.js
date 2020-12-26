//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

/* ----------CREATE---------- */

/* ----------READ--------- */
describe("/GET events", () => {
  it("it should GET all the events", (done) => {
    chai
      .request(server)
      .get("/db_api/read/events")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        //should have property events?
        done();
      });
  });
});

//unit test for read ONE event
//should have status 200
//should be an object
//should have a property event
//should be of length 1

//unit test for create route WORKING
//describe /post
//should have status 201//Created response
//should be an object
//should have a property event
//should have a property msg

//unit test for create route where you try to create a dupe
//describe /post
//should have status 409//Conflict with current state of the server
//should be an object
//should have an error with property of msg

//unit test for create route when missing a parameter
//describe /post
//should have a status 206//Partial content error code
//should be an object
//should have a property msg
//should have an error msg

/* ---------UPDATE---------- */
/* --------DESTROY---------- */
