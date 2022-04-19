const Model = require('../models/index');
const Category = Model.categories;
const Product = Model.product;

module.exports.readCategory = (req, res) => {

    Category.findAll()
        .then(category => {
            res.status(200).json({
                success: true,
                categories: category
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


module.exports.detailCategory = (req, res) => {

    Category.findOne({ where: { id: req.params.id } })
        .then(category => {
            if (!category) {
                res.status(404).json({
                    success: false,
                    message: "Nothing Category Id"
                })
            }
            res.status(200).json({
                success: true,
                categories: category
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


module.exports.createdCategory = (req, res) => {

    let Categories = {
        name: req.body.name,
        image: req.body.image
    }

    Category.create(Categories)
        .then(category => {
            res.status(201).json({
                success: true,
                categories: category
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


module.exports.updateCategory = (req, res) => {

    let Categories = {
        name: req.body.name,
        image: req.body.image
    }

    Category.findOne({ where: { id: req.params.id } })
        .then(category => {
            if (!category) {
                res.status(404).json({
                    success: false,
                    message: "Nothing Id Category"
                })
            }
            Category.update(Categories, { where: { id: req.params.id } })
                .then(categories => {
                    res.status(200).json({
                        success: true,
                        categories: categories
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
                message: "Error Bad Request",
                error: err
            })
        })

}


module.exports.readProductByCategory = async (req, res) => {


    let category = await Category.findOne({ where: { id: req.params.id } })
    let categoryId = category.id;

    Product.findAll({ where: { categoryId: categoryId }, include: ['categories'] })
        .then(product => {
            res.status(200).json({
                success: true,
                categories: category.name,
                product: product
            })
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                error: err
            })
        })


    // cara lain 

    // Category.findAll({ where: { id: req.params.id }, include: ['product'] })
    //     .then(categories => {
    //         res.status(200).json({
    //             success: true,
    //             categories: categories
    //         })
    //     })
    //     .catch(err => {
    //         res.status(500).json({
    //             success: false,
    //             error: err
    //         })
    //     })
} 