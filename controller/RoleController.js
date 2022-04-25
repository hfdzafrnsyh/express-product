const Model = require('../models/index');
const Role = Model.roles;
const User = Model.users;



module.exports.webReadRole = async (req, res) => {

    const user = await User.findOne({ where: { id: req.user.userId } });
    const roles = await Role.findAll({})

    res.render('pages/role/index', {
        title: 'Role',
        layout: 'layouts/app',
        user: user,
        roles: roles

    })

}

module.exports.webRemoveRole = async (req, res) => {

    try {
        await Role.destroy({ where: { id: req.params.id } });
        res.redirect('/role')
    } catch (err) {
        res.send('error' + err)
    }

}

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