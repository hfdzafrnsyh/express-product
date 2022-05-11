const chai = require('chai')
const chaiHttp = require('chai-http');

const server = require('../app');


chai.use(chaiHttp);
chai.should();

describe('Users', () => {

    let token = `auth_token`;

    // GET USER
    describe('GET /api/users', () => {
        it("It should GET all the user", (done) => {

            chai.request(server)
                .get("/api/user")
                .auth(token, { type: "bearer" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    })


})