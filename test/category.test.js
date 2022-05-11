const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');

const Model = require('../models/index');
const Categories = Model.categories;

chai.use(chaiHttp);
chai.should();

describe('Category', () => {



    let token = `auth_token`;


    beforeEach((done) => {
        Categories.destroy({}, (err) => {
            done();
        }).then(done())
    });

    // GET Category
    describe('GET /api/category', () => {
        it("It should GET all the Category", (done) => {

            chai.request(server)
                .get("/api/category")
                .auth(token, { type: "bearer" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    })

    // POST Category
    describe('POST /api/category', () => {
        it('It should POST the Category', (done) => {

            let category = {
                name: 'Testing',
                image: 'testing.png'
            }

            chai.request(server)
                .post('/api/category/create')
                .auth(token, { type: "bearer" })
                .send(category)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done()
                })

        })
    })


    // GET DETAIL Category
    describe('GET DETAIL /api/category', () => {
        it('It should GET DETAIL the Category', (done) => {
            let id = 10;
            chai.request(server)
                .get(`/api/category/${id}`)
                .auth(token, { type: "bearer" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.categories.should.have.property('name');
                    res.body.categories.should.have.property('image');
                    res.body.categories.should.have.property('id').eql(id);
                    done()
                })

        })
    })


    // PUT Category
    describe('PUT /api/category', () => {
        it('It should PUT the Category', (done) => {
            let id = 10;

            let categorys = {
                name: "Test",
                image: "Test.png"
            }

            Categories.update(categorys, { where: { id: id } }, (err, category) => {
                chai.request(server)
                    .put(`/api/category/${category.id}`)
                    .auth(token, { type: "bearer" })
                    .send(categorys)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success').eql(true);
                        done()
                    })
            }).then(done())

        })
    })



    // GET ProductByCategory 
    describe('GET /api/category', () => {
        it('it should GET product by Category', (done) => {
            let id = 5;

            chai.request(server)
                .get(`/api/category/${id}/product`)
                .auth(token, { type: "bearer" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done();
                })
        })
    })

})