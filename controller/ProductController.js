const Model = require('../models/index');
const Product = Model.product;
const Category = Model.categories;


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