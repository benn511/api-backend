//Require the dev-dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../server");
let should = chai.should();

chai.use(chaiHttp);

/* INIT server PING */
describe("/GET ping", () => {
  it("it should GET a PING from the server", (done) => {
    chai
      .request(server)
      .get("/db_api/ping")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("msg").eql("DB API successful ping");
        done();
      });
  });
});

/* ----------CREATE---------- */
describe("/post event", () => {
  it("it should fail to POST a new event because of missing parameters for owner and description", (done) => {
    chai
      .request(server)
      .post("/db_api/create/event")
      // .send({ name: "Tob Squad" })
      .end((err, res) => {
        res.should.have.status(206);
        res.body.should.be.a("object");
        res.body.errors.should.have
          .property("msg")
          .eql(
            "Missing JSON data.Missing name.Missing description.Missing owner."
          );
      });
    done();
  });
});
describe("/post event dupe", () => {
  it("it should fail to POST a new event because of duplicate entry with name and owner passed", (done) => {
    chai
      .request(server)
      .post("/db_api/create/event")
      .send({ name: "Parade", owner: "Naomi", description: "OSRS" })
      .end((err, res) => {
        res.should.have.status(409); //Problem with current server
        res.body.should.be.a("object");
        res.body.errors.should.have
          .property("msg")
          .eql("Event already exists with name and owner");
        done();
      });
  });
});

/* ----------READ--------- */
describe("/GET events", () => {
  it("it should GET all the events", (done) => {
    chai
      .request(server)
      .get("/db_api/read/events")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("events");
        //should have property events?
        done();
      });
  });
});

describe("/GET event", () => {
  it("it should GET an event with an id passed to it", (done) => {
    chai
      .request(server)
      .get("/db_api/read/event/5")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("event");
        res.body.should.have.property("msg");
        res.body.should.have
          .property("msg")
          .eql("Successfully found an event with id passed");
        //should have property events?
        done();
      });
  });
});

describe("/GET event error", () => {
  it("it should GET an error from sending an invalid id", (done) => {
    chai
      .request(server)
      .get("/db_api/read/event/999")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.errors.should.have
          .property("id")
          .eql("Could not find event with id passed");
        done();
      });
  });
});

/* ---------UPDATE---------- */
/* --------DESTROY---------- */
