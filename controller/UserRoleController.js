const Model = require('../models/index');
const User = Model.users;
const Role = Model.roles;
const UserRole = Model.user_roles;



// WEB
module.exports.webReadRoleUser = async (req, res) => {


    const user = await User.findOne({ where: { id: req.user.userId } });
    const roleuser = await UserRole.findAll({ attributes: ['id'], include: ['users', 'roles'] });
    const roles = await Role.findAll();

    res.locals.message = req.flash();

    res.render('pages/roleuser/index', {
        title: 'Role User',
        layout: 'layouts/app',
        user: user,
        roleusers: roleuser,
        roles: roles
    })

}


module.exports.webCreatedRoleUser = async (req, res) => {

    try {

        let roleuser = {
            id_user: req.body.id_user,
            id_role: req.body.id_role
        }

        await UserRole.create(roleuser)
        req.flash('success', 'Add User Role Successfully')
        res.redirect('/roleuser');

    } catch {
        req.flash('error', 'Failed Add Role User');
        res.redirect('/roleuser');
    }

}

module.exports.webEditRoleUser = async (req, res) => {

    const user = await User.findOne({ where: { id: req.user.userId } })
    const roleuser = await UserRole.findOne({ where: { id: req.params.id }, attributes: ['id', 'id_user', 'id_role'], include: ['users', 'roles'] });
    const roles = await Role.findAll();

    res.render('pages/roleuser/edit', {
        'title': 'Edit Role User',
        layout: 'layouts/app',
        user: user,
        roleuser: roleuser,
        roles: roles

    })

}


module.exports.webUpdateRoleUser = async (req, res) => {

    try {

        let roleuser = {
            id_user: req.body.id_user,
            id_role: req.body.id_role
        }

        await UserRole.update(roleuser, { where: { id: req.params.id } })
        req.flash('success', 'Update User Role Success')
        res.redirect('/roleuser')
    } catch {
        req.flash('error', 'Failed Update User Role')
        res.redirect('/roleuser')
    }

}

// API
module.exports.readUserRole = (req, res) => {

    UserRole.findAll({ attributes: ['id', 'id_user', 'id_role'], include: ['users', 'roles'] })
        .then(userRole => {
            res.status(200).json({
                success: true,
                user_role: userRole
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


module.exports.createdUserRole = async (req, res) => {

    let user = await User.findOne({ where: { id: req.body.id_user } });
    let role = await Role.findOne({ where: { id: req.body.id_role } });

    if (!user) {
        res.status(404).json({
            success: false,
            message: "Nothing Id User"
        })
    } else if (!role) {
        res.status(404).json({
            success: false,
            message: "Nothing Id Role"
        })
    }

    let UserRoles = {
        id_user: user.id,
        id_role: role.id
    }


    UserRole.create(UserRoles)
        .then(userRole => {
            res.status(201).json({
                success: true,
                user_role: userRole
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


module.exports.updateUserRole = async (req, res) => {

    let user = await User.findOne({ where: { id: req.body.id_user } });
    let role = await Role.findOne({ where: { id: req.body.id_role } });

    if (!user) {
        res.status(404).json({
            success: false,
            message: "Nothing Id User"
        })
    } else if (!role) {
        res.status(404).json({
            success: false,
            message: "Nothing Id Role"
        })
    }

    let UserRoles = {
        id_user: user.id,
        id_role: role.id
    }


    UserRole.findOne({ where: { id: req.params.id } })
        .then(userRole => {
            if (!userRole) {
                res.status(404).json({
                    success: false,
                    message: "Error Nothing Id UserRole"
                })
            }

            UserRole.update(UserRoles, { where: { id: req.params.id } })
                .then(userRoles => {
                    res.status(200).json({
                        success: true,
                        user_role: userRoles
                    })
                })
                .catch(err => {
                    res.status(400).json({
                        success: false,
                        message: "Error bad Request",
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