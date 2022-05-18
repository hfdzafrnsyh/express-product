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



    // register
    describe('POST /api/register', () => {
        it('it should POST the user Register', (done) => {

            let users = {
                email: 'usertest@test.id',
                name: 'User Test',
                photo: 'default.png',
                phone: '+62000',
                password: 'testing'
            }

            chai.request(server)
                .post("/api/register")
                .send(users)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    done();
                })

        })
    })


    // login
    describe('POST /api/login', () => {
        it('it should POST the user Login', (done) => {

            let users = {
                email: 'usertest@test.id',
                password: 'testing'
            }

            chai.request(server)
                .post("/api/login")
                .send(users)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })

        })
    })


    // forgot password
    describe('POST /api/forgotpassword', () => {
        it('it should POST the user Forgot Password', (done) => {

            let users = {
                email: 'usertest@test.id'
            }

            chai.request(server)
                .post("/api/forgotpassword")
                .send(users)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })

        })
    })

    // reset password
    describe('POST /api/resetpassword', () => {
        it('it should POST the user Reset Password', (done) => {

            let users = {
                email: 'usertest@test.id',
                password: '111111'
            }

            chai.request(server)
                .post("/api/resetpassword")
                .send(users)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })

        })
    })


})