const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');

const Model = require('../models/index');
const RoleUser = Model.user_roles;

chai.use(chaiHttp);
chai.should();

describe('RoleUser', () => {



    let token = `auth_token`;


    beforeEach((done) => {
        RoleUser.destroy({}, (err) => {
            done();
        }).then(done())
    });


    // GET RoleUser
    describe('GET /api/roleuser', () => {

        it('it should GET the RoleUser', (done) => {
            chai.request(server)
                .get('/api/roleuser')
                .auth(token, { type: "bearer" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                })
        })

    })


    // POST RoleUser
    describe('POST /api/roleuser', () => {

        it('it should POST the RoleUser', (done) => {

            let roleUser = {
                id_user: 15,
                id_role: 60
            }

            chai.request(server)
                .post('/api/roleuser/create')
                .auth(token, { type: "bearer" })
                .send(roleUser)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                })
        })

    })



    // PUT RoleUser
    describe('PUT /api/roleuser', () => {

        it('it should PUT the RoleUser', (done) => {

            let id = 8;

            let roleUser = {
                id_user: 15,
                id_role: 13
            }

            RoleUser.update(roleUser, { where: { id: id } }, (err, roles) => {
                chai.request(server)
                    .put(`/api/roleuser/${roles.id}`)
                    .auth(token, { type: "bearer" })
                    .send(roleUser)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success').eql(true);
                        done();
                    })
            }).then(done())

        })

    })


})