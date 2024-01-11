let server = require("../index");
let chaiHttp = require("chai-http");
var chai = require("chai");
const path = require('path');
const basedir = path.resolve('./test');   
const utils = require("../model/user_schema");
let routes = require("../routes/userRoutes");
//import chech from '../test/'

chai.should();
chai.use(chaiHttp);

describe(" User Login API", () => {
   
    // Test The Get resourceLimits
    describe("POST /api/users", () => {
      it("IT should Return login user detail :", (done) => {
        const data = {
          email: "arun@gmail.com",
          password: "abc@12345",
        };
        chai
          .request(server)
          .post("/user/userLogin")
          .send(data)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a("object");
            res.body.should.have.property("success").eq("success");
            res.body.should.have.property("message").eq("Login Success");
            res.body.should.have.property("token");
            //res.body.should.have.property("name").eq("Aarvi2");
            //res.should.have.property('email').eq('aarvi@gmail.com')
            done();
          });
      });
    })
})

it("It should Return Error Message :", (done) => {
    const data = {
      email: "aarvi233@gmail.com",
      password: "abc@123",
    };
    chai
      .request(server)
      .post("/user/userLogin")
      .send(data)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property("success").eq("failure");
        res.body.should.have
          .property("message")
          .eq("Email user is not found");
        done();
      });
  });

  it("It should Return Email or Password Error Message :", (done) => {
    const data = {
      email: "arun@gmail.com",
      password: "abc2@123",
    };
    chai
      .request(server)
      .post("/user/userLogin")
      .send(data)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property("success").eq("failure");
        res.body.should.have
          .property("message")
          .eq("Password or Email is not match");
        done();
      });
  });
 
//   describe("POST /api/users", () => {
//     it("It should  Add new user", (done) => {
//       const user = {
//         "name": "Aarvi",
//         "email": "arun2.lal@graffersid.com",
//         "password": "abc@123",
//         "mobile": "111111111",
//         "city": "Indore",
//         "state": "M.P.",  
//       };
//       chai
//         .request(server)
        
//         .post("/user/registerUser")  
//         .set('Content-Type', 'multipart/form-data')
//         .attach('profilepic',`${basedir}/check.jpg`)
          
//         // .attach('profilepic', './test/check.jpg')
//         //.send(user)
//         .end((err, res) => {
//           res.should.have.status(200);
//           res.body.should.have.property("success").eq("success");
//           res.body.should.have
//             .property("messsge")
//             .eq("Registation Successfull");
//           done();
//         });


//         // it("It should  retrun duplicate user error message ", (done) => {
//         //     const user = {
//         //       name: "Aarvi",
//         //       email: "arun.lal22222@graffersid.com",
//         //       password: "Abc@123",
//         //       phone_no: "111111111",
//         //       city: "Indore",
//         //       state: "M.P.",
//         //     };
//         //     chai
//         //       .request(server)
//         //       .post("/user/registerUser")
//         //       .send(user)
//         //       .end((err, res) => {
//         //         res.should.have.status(409);
//         //         res.body.should.have
//         //           .property("error")
//         //           .eq("Email already exit");
//         //         done();
//         //       });
//         //   });

          
//     });
// })

