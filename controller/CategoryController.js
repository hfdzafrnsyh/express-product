const Model = require('../models/index');
const Category = Model.categories;
const Product = Model.product;
const User = Model.users;




// WEB
module.exports.webReadCategory = async (req, res) => {

    const user = await User.findOne({ where: { id: req.user.userId } })
    const categorys = await Category.findAll();

    res.locals.message = req.flash();

    res.render('pages/category/index', {
        title: 'Category',
        layout: 'layouts/app',
        user: user,
        categorys: categorys,
        csrfToken: req.csrfToken()
    })

}



module.exports.webCreatedCategory = async (req, res) => {

    let files = req.file;

    try {
        if (!files) {
            req.flash('error', 'Error Nothing Image');
            res.redirect('/category')
        } else {
            let category = {
                name: req.body.name,
                image: req.file.filename
            }

            await Category.create(category);
            req.flash('success', 'Add Category Successfully');
            res.redirect('/category')
        }
    } catch {
        req.flash('error', `Error`);
        res.redirect('/category')
    }

}


module.exports.webEditCategory = async (req, res) => {

    const user = await User.findOne({ where: { id: req.user.userId } });
    const category = await Category.findOne({ where: { id: req.params.id } })

    res.render('pages/category/edit', {
        title: 'Edit Category',
        layout: 'layouts/app',
        user: user,
        category: category,
        csrfToken: req.csrfToken()
    })

}



module.exports.webUpdateCategory = async (req, res) => {

    let files = req.file;

    try {

        if (!files) {

            let category = {
                name: req.body.name
            }

            await Category.update(category, { where: { id: req.params.id } });
            req.flash('success', 'Update Category Successfully');
            res.redirect('/category')
        } else {
            let category = {
                name: req.body.name,
                image: req.file.filename
            }

            await Category.update(category, { where: { id: req.params.id } });
            req.flash('success', 'Update Category Successfully');
            res.redirect('/category')
        }

    } catch {
        req.flash('error', `Error`)
        res.redirect('/category')
    }

}


module.exports.webRemoveCategory = async (req, res) => {

    try {

        await Category.destroy({ where: { id: req.params.id } })
        req.flash('success', 'Delete Category Successfully')
        res.redirect('/category');

    } catch {
        req.flash('error', `Error Remove Category`);
        res.redirect('/category')
    }

}


// API
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