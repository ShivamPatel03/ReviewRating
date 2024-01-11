let chai = require("chai").should();
const chaiHttp = require("chai-http");
let server = require("../index");

chai.use(chaiHttp);

describe("Task API", () => {
  describe("GET/api/tasks", () => {
    it("It should get all the task", (done) => {
      chai
        .request(server)
        .get("/test/api")
        .end((req, res) => {
          res.should.have.status(200);
          res.body.should.be.a("array");
          res.body.length.should.be.eq(3);
          done();
        });
    });
  });
});
