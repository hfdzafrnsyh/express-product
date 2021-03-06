const Model = require('../models/index');
const Role = Model.roles;
const User = Model.users;



module.exports.webReadRole = async (req, res) => {

    const page = Number.parseInt(req.query.page);
    const size = Number.parseInt(req.query.size);

    const limit = size ? +size : 5

    const user = await User.findOne({ where: { id: req.user.userId } });
    const roles = await Role.findAndCountAll({
        limit: limit,
        offset: page ? page * limit : 0
    })

    res.locals.message = req.flash();

    res.render('pages/role/index', {
        title: 'Role',
        layout: 'layouts/app',
        user: user,
        roles: roles.rows,
        csrfToken: req.csrfToken(),
        totalPages: Math.ceil(roles.count / Number.parseInt(limit))
    })

}


module.exports.webCreatedRole = async (req, res) => {

    try {

        let role = {
            name: req.body.name
        }

        await Role.create(role)
        req.flash('success', 'Add Role Successfully')
        res.redirect('/role')

    } catch {
        req.flash('error', 'Failed Add Role');
        res.redirect('/role')
    }

}




module.exports.webEditRole = async (req, res) => {

    const user = await User.findOne({ where: { id: req.user.userId } })
    const role = await Role.findOne({ where: { id: req.params.id } })


    res.render('pages/role/edit', {
        title: 'Edit Role',
        layout: 'layouts/app',
        user: user,
        role: role,
        csrfToken: req.csrfToken()
    })

}


module.exports.webUpdateRole = async (req, res) => {

    try {
        let role = {
            name: req.body.name
        }

        await Role.update(role, { where: { id: req.params.id } })
        req.flash('success', 'Update Role Success');
        res.redirect('/role')

    } catch {
        req.flash('error', 'Failed update Role')
        res.redirect('/role')
    }

}

module.exports.webRemoveRole = async (req, res) => {

    try {
        await Role.destroy({ where: { id: req.params.id } });
        req.flash('success', 'Delete Role Successfully')
        res.redirect('/role')
    } catch (err) {
        res.send('error' + err)
    }

}


// API
module.exports.readRole = (req, res) => {

    Role.findAll()
        .then(role => {
            res.status(200).json({
                success: false,
                role: role
            })
        })
        .catch(err => {
            res.status(500).json({
                success: true,
                message: "Internal Server Error",
                error: err
            })
        })

}


// API

module.exports.createdRole = (req, res) => {

    let Roles = {
        name: req.body.name
    }

    Role.create(Roles)
        .then(role => {
            res.status(201).json({
                success: true,
                role: role
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


module.exports.detailRole = (req, res) => {

    Role.findOne({ where: { id: req.params.id } })
        .then(role => {
            if (!role) {
                res.status(404).json({
                    success: false,
                    message: "Nothing Role Id"
                })
            }
            res.status(200).json({
                success: true,
                role: role
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

module.exports.updateRole = (req, res) => {

    let Roles = {
        name: req.body.name
    }

    Role.findOne({ where: { id: req.params.id } })
        .then(role => {
            if (!role) {
                res.status(404).json({
                    success: false,
                    message: "Nothing Role Id"
                })
            }

            Role.update(Roles, { where: { id: req.params.id } })
                .then(roles => {
                    res.status(200).json({
                        success: true,
                        message: "Update Successfully",
                        role: roles
                    })
                })
                .catch(err => {
                    res.status(400).json({
                        success: false,
                        message: "Bad Request",
                        error: err
                    })
                })
        })
        .catch(err => {
            res.status(500).json({
                succes: false,
                message: "Internal Server Error",
                error: err
            })
        })

}