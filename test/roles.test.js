const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');

const Model = require('../models/index');
const Role = Model.roles;

chai.use(chaiHttp);
chai.should();

describe('Roles', () => {



    let token = `auth_token`;


    beforeEach((done) => {
        Role.destroy({}, (err) => {
            done();
        }).then(done())
    });

    // GET role
    describe('GET /api/role', () => {
        it("It should GET all the role", (done) => {

            chai.request(server)
                .get("/api/role")
                .auth(token, { type: "bearer" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    })


    // POST role
    describe('POST /api/role', () => {
        it('It should POST the role', (done) => {

            let roles = {
                name: 'Web Developer'
            }

            chai.request(server)
                .post('/api/role/create')
                .auth(token, { type: "bearer" })
                .send(roles)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.role.should.have.property('name');
                    done()
                })

        })
    })


    // GET DETAIL role
    describe('GET DETAIL /api/role', () => {
        it('It should GET DETAIL the role', (done) => {
            let id = 59;
            chai.request(server)
                .get(`/api/role/${id}`)
                .auth(token, { type: "bearer" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.role.should.have.property('name');
                    res.body.role.should.have.property('id').eql(id);
                    done()
                })

        })
    })


    // PUT role
    describe('PUT /api/role', () => {
        it('It should PUT the role', (done) => {
            let id = 59;

            let roles = {
                name: "Game Developer"
            }

            Role.update(roles, { where: { id: id } }, (err, role) => {
                chai.request(server)
                    .put(`/api/role/${role.id}`)
                    .auth(token, { type: "bearer" })
                    .send(roles)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success').eql(true);
                        done()
                    })
            }).then(done())

        })
    })

    // DELETE role

    // describe('DELETE /api/role', () => {
    //     it('It should DELETE the role', (done) => {
    //         let id = 59;

    //         Role.destroy({ where: { id: id } }, (err, role) => {
    //             chai.request(server)
    //                 .delete(`/api/role/${role.id}`)
    //                 .auth(token, { type: "bearer" })
    //                 .end((err, res) => {
    //                     res.should.have.status(200);
    //                     res.body.should.be.a('object');
    //                     res.body.should.have.property('success').eql(true);
    //                     done()
    //                 })
    //         }).then(done())

    //     })
    // })


})