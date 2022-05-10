const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');

const Model = require('../models/index');
const User = Model.users;

chai.use(chaiHttp);
chai.should();

describe('Users', () => {

    // GET USER
    describe('GET /api/users', () => {
        it("It should GET all the user", (done) => {
            chai.request(server)
                .get("/api/user")
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    })



})