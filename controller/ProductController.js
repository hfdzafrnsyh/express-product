const Model = require('../models/index');
const Product = Model.product;
const Category = Model.categories;
const User = Model.users;


// WEB
module.exports.webReadProduct = async (req, res) => {

    const page = Number.parseInt(req.query.page);
    const size = Number.parseInt(req.query.size);

    const limit = size ? +size : 5;

    const user = await User.findOne({ where: { id: req.user.userId } })
    const products = await Product.findAndCountAll({
        include: ['categories'],
        limit: limit,
        offset: page ? page * limit : 0
    })
    const categorys = await Category.findAll();

    res.locals.message = req.flash();

    res.render('pages/product/index', {
        title: 'Product',
        layout: 'layouts/app',
        user: user,
        products: products.rows,
        totalPages: Math.ceil(products.count / Number.parseInt(limit)),
        categorys: categorys,
        csrfToken: req.csrfToken()

    })

}


module.exports.webCreatedProduct = async (req, res) => {

    let files = req.file;

    try {
        if (!files) {
            req.flash('error', 'Error Nothing Image');
            res.redirect('/product')
        } else {

            let products = {
                name: req.body.name,
                color: req.body.color,
                stock: req.body.stock,
                price: req.body.price,
                categoryId: req.body.id_category,
                image: req.file.filename
            }

            await Product.create(products)
            req.flash('success', 'Add Product Successfully');
            res.redirect('/product')
        }
    } catch {
        req.flash('error', `Error`);
        res.redirect('/product')
    }

}

module.exports.webEditProduct = async (req, res) => {

    const user = await User.findOne({ where: { id: req.user.userId } });
    const product = await Product.findOne({ include: ['categories'], where: { id: req.params.id } });
    const categorys = await Category.findAll();

    res.locals.message = req.flash();

    res.render('pages/product/edit', {
        title: 'Edit Product',
        layout: 'layouts/app',
        user: user,
        product: product,
        categorys: categorys,
        csrfToken: req.csrfToken()
    })

}


module.exports.webUpdateProduct = async (req, res) => {

    let files = req.file;

    try {
        if (!files) {
            let product = {
                name: req.body.name,
                color: req.body.color,
                stock: req.body.stock,
                price: req.body.price,
                categoryId: req.body.id_category
            }

            await Product.update(product, { where: { id: req.params.id } })
            req.flash('success', 'Edit Product Successfully');
            res.redirect('/product')

        } else {

            let product = {
                name: req.body.name,
                color: req.body.color,
                stock: req.body.stock,
                price: req.body.price,
                categoryId: req.body.id_category,
                image: req.file.filename
            }

            await Product.update(product, { where: { id: req.params.id } })
            req.flash('success', 'Edit Product Successfully');
            res.redirect('/product')

        }
    } catch {
        req.flash('error', 'Error Add Product');
        res.redirect('/product')
    }

}


module.exports.webRemoveProduct = async (req, res) => {

    try {
        await Product.destroy({ where: { id: req.params.id } })
        req.flash('success', 'Delete Product Successfully');
        res.redirect('/product');
    } catch {
        req.flash('error', 'Error Delete Product');
        res.redirect('/product')
    }

}

// API
module.exports.readProduct = (req, res) => {

    Product.findAll({ include: ['categories'] })
        .then(product => {
            res.status(200).json({
                success: true,
                product: product
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err
            })
        })
}

module.exports.detailProduct = (req, res) => {

    Product.findOne({ where: { id: req.params.id } })
        .then(product => {
            if (!product) {
                res.status(404).json({
                    success: false,
                    message: "Nothing Category Id"
                })
            }
            res.status(200).json({
                success: true,
                product: product
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err
            })
        })

}


module.exports.createdProduct = async (req, res) => {

    let category = await Category.findOne({ where: { id: req.body.categoryId } })

    if (!category) {
        res.status(404).json({
            success: false,
            message: "Error nothing Category Id"
        })
    }

    let Products = {
        name: req.body.name,
        color: req.body.color,
        stock: req.body.stock,
        price: req.body.price,
        categoryId: category.id,
        image: req.body.image
    }

    Product.create(Products)
        .then(product => {
            res.status(201).json({
                success: true,
                product: product
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err
            })
        })

}


module.exports.updateProduct = async (req, res) => {

    let category = await Category.findOne({ where: { id: req.body.categoryId } })

    if (!category) {
        res.status(404).json({
            success: false,
            message: "Error nothing Category Id"
        })
    }

    let Products = {
        name: req.body.name,
        color: req.body.color,
        stock: req.body.stock,
        price: req.body.price,
        categoryId: category.id,
        image: req.body.image
    }


    Product.findOne({ where: { id: req.params.id } })
        .then(product => {
            if (!product) {
                res.status(404).json({
                    success: false,
                    message: "Nothing Product Id"
                })
            }
            Product.update(Products, { where: { id: req.params.id } })
                .then(products => {
                    res.status(200).json({
                        success: true,
                        product: products
                    })
                })
                .catch(err => {
                    res.status(400).json({
                        success: false,
                        message: "Error Bad Request",
                        error: err
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err
            })
        })

}


module.exports.removeProduct = (req, res) => {

    Product.destroy({ where: { id: req.params.id } })
        .then(product => {
            if (!product) {
                res.status(404).json({
                    success: false,
                    message: "Error Nothing Id"
                })
            }
            res.status(200).json({
                success: true,
                message: "Delete Successfully"
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err
            })
        })

}