const Model = require('../models/index');
const User = Model.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const { response } = require('express');



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



module.exports.webPostLogin = async (req, res, next) => {


    const user = await User.findOne({ where: { email: req.body.email } })

    if (!user) {
        req.flash('error', 'Email Not Registered')
        res.redirect('/login')
    }

    const users = {
        email: req.body.email,
        password: req.body.password
    }

    await axios.post('http://localhost:5000/api/login', users)
        .then(response => {

            const token = response.data.token
            res.cookie('jwt', token, { httpOnly: true, secure: true })
            res.redirect('/home')

        })
        .catch(err => {
            req.flash('error', 'Invalid Email or Password');
            console.log('error' + err)
            res.redirect('/login')
        })

}

module.exports.webRegister = (req, res) => {

    res.locals.message = req.flash()
    res.render('auth/register', {
        title: 'Register',
        layout: false
    })
}



module.exports.webPostRegister = async (req, res) => {


    const user = await User.findOne({ where: { email: req.body.email } })

    if (user) {
        req.flash('error', 'Email hash Registered')
        res.redirect('/register');
    } else if (req.body.password !== req.body.password_confirmation) {
        req.flash('error', 'Password Dont Match')
        res.redirect('/register');
    } else {
        let users = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }

        await axios.post('http://localhost:5000/api/register', users)
            .then(response => {
                if (response.status == 201) {
                    req.flash('success', 'Created Account Successfully')
                    res.redirect('/login')
                }
            })
            .catch(err => {
                res.redirect('/register' + err)
            })
    }



}


// API

module.exports.dataUser = (req, res) => {

    User.findAll({ attributes: ['name', 'email', 'photo', 'phone', 'isAdmin'], include: ['roles'] })
        .then(user => {
            res.status(200).json({
                success: true,
                user: user
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
                            user: users
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

                res.status(200).json({
                    success: true,
                    user: user,
                    token: token
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