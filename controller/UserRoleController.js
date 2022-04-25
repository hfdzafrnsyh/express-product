const Model = require('../models/index');
const User = Model.users;
const Role = Model.roles;
const UserRole = Model.user_roles;



// WEB
module.exports.webReadRoleUser = async (req, res) => {

    const user = await User.findOne({ where: { id: req.user.userId } });
    const roleuser = await UserRole.findAll({ include: ['users', 'roles'] });

    res.render('pages/roleuser/index', {
        title: 'Role User',
        layout: 'layouts/app',
        user: user,
        roleusers: roleuser
    })

}


// API
module.exports.readUserRole = (req, res) => {

    UserRole.findAll({ include: ['users', 'roles'] })
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