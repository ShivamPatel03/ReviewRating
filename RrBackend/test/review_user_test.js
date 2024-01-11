let server = require("../index");
let chaiHttp = require("chai-http");
var chai = require("chai");
const res = require("express/lib/response");

chai.should();
// chai.use(chaiHttp); 

describe("User Login Test case", ()=> {

    describe("POST/api/users", ()=>{
        it("It should return login user details if user Email and password valid : ", (done) => {
            const data = {
                email : "arun@gmail.com",
                password : "abc@12345"
            }
            chai.request(server)
            .post("/user/userLogin")
            .send(data)
            .end((req, res) =>{
                res.should.have.status(200);
                res.body.should.have.property("status").eq("Success");
                res.body.should.have.property("message").eq("Login Success");
                res.body.should.have.property("token")
            })
            done()
        }),

        it("It should return login user details if user Email and password invalid : ", (done) => {
            const data = {
                email : "arun@gmail.com",
                password : "ram"
            }
            chai.request(server)
            .post("/user/userLogin")
            .send(data)
            .end((req, res) =>{
                res.should.have.status(403);
                res.body.should.have.property("status").eq("Failed");
            })
            done()
        })
    })
})
