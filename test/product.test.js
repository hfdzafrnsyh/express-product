const chai = require('chai')
const chaiHttp = require('chai-http');
const server = require('../app');

const Model = require('../models/index');
const Product = Model.product;

chai.use(chaiHttp);
chai.should();

describe('Product', () => {



    let token = `auth_token`;


    beforeEach((done) => {
        Product.destroy({}, (err) => {
            done();
        }).then(done())
    });

    // GET role
    describe('GET /api/product', () => {
        it("It should GET all the product", (done) => {

            chai.request(server)
                .get("/api/product")
                .auth(token, { type: "bearer" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });

    })


    // POST Product
    describe('POST /api/product', () => {
        it('It should POST the product', (done) => {

            let products = {
                name: 'Testing',
                color: 'Testing',
                stock: 1,
                price: 'Rp.000000',
                categoryId: 5,
                image: 'Testing.png'
            }

            chai.request(server)
                .post('/api/product/create')
                .auth(token, { type: "bearer" })
                .send(products)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    done()
                })

        })
    })


    // GET DETAIL Product
    describe('GET DETAIL /api/product', () => {
        it('It should GET DETAIL the Product', (done) => {
            let id = 12;
            chai.request(server)
                .get(`/api/product/${id}`)
                .auth(token, { type: "bearer" })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('success').eql(true);
                    res.body.product.should.have.property('name');
                    res.body.product.should.have.property('color');
                    res.body.product.should.have.property('stock');
                    res.body.product.should.have.property('price');
                    res.body.product.should.have.property('categoryId');
                    res.body.product.should.have.property('image');
                    res.body.product.should.have.property('id').eql(id);
                    done()
                })

        })
    })


    // PUT role
    describe('PUT /api/product', () => {
        it('It should PUT the Product', (done) => {
            let id = 12;

            let products = {
                name: 'Test',
                color: 'Test',
                stock: 2,
                price: 'Rp.100000',
                categoryId: 5,
                image: 'Test.png'
            }

            Product.update(products, { where: { id: id } }, (err, product) => {
                chai.request(server)
                    .put(`/api/product/${product.id}`)
                    .auth(token, { type: "bearer" })
                    .send(products)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success').eql(true);
                        done()
                    })
            }).then(done())

        })
    })


    // DELETE Product
    describe('DELETE /api/product', () => {
        it('It should DELETE the Product', (done) => {
            let id = 14;

            Product.destroy({ where: { id: id } }, (err, product) => {
                chai.request(server)
                    .delete(`/api/product/${product.id}`)
                    .auth(token, { type: "bearer" })
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.a('object');
                        res.body.should.have.property('success').eql(true);
                        done()
                    })
            }).then(done())

        })
    })


})