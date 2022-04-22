const Model = require('../models/index');
const User = Model.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


// WEB
module.exports.webLogin = (req, res) => {


    res.locals.message = req.flash();
    res.render('auth/login',
        {
            title: "Login",
            layout: false,
        }
    );

}


module.exports.webRegister = (req, res) => {

    res.locals.message = req.flash()
    res.render('auth/register', {
        title: 'Register',
        layout: false
    })
}




// API

module.exports.dataUser = (req, res) => {

    User.findAll({ attributes: ['name', 'email', 'photo', 'phone', 'isAdmin'], include: ['roles'] })
        .then(user => {
            res.status(200).json({
                success: true,
                users: user
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


// register
module.exports.register = (req, res) => {

    let Users = {
        name: req.body.name,
        email: req.body.email,
        photo: req.body.photo,
        phone: req.body.phone,
        password: bcrypt.hashSync(req.body.password, 10)
    }


    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                User.create(Users)
                    .then(users => {
                        res.status(201).json({
                            success: true,
                            message: "Register Successfully",
                            users: users
                        })
                    })
                    .catch(err => {
                        res.status(400).json({
                            success: false,
                            message: "Error Bad Request Failed Register",
                            error: err
                        })
                    })
            } else {
                res.status(400).json({
                    success: false,
                    message: "User Already Exist"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err
            })
        })

}




// login

module.exports.login = (req, res, next) => {

    let secret = process.env.SECRET;

    User.findOne({ where: { email: req.body.email } })
        .then(user => {
            if (!user) {
                res.status(404).json({
                    success: false,
                    message: 'User Account Not Found'
                })
            } else if (user && bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign({
                    userId: user.id,
                    isAdmin: user.isAdmin
                },
                    secret
                    ,
                    {
                        expiresIn: '1d'
                    }
                );

                const users = ({ email: user.email, token: token });

                res.cookies('jwt', token, { httpOnly: true, secure: true });
                res.status(200).json({
                    success: true,
                    users: users
                })

            } else {
                res.status(400).json({
                    success: false,
                    message: "Wrong Password"
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "Internal Server Error",
                error: err
            })
        })

}