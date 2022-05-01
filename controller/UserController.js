const Model = require('../models/index');
const User = Model.users;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');




// WEB
module.exports.webLogin = (req, res) => {

    res.locals.message = req.flash();

    res.render('auth/login',
        {
            title: "Login",
            layout: false,
            csrfToken: req.csrfToken()
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
        layout: false,
        csrfToken: req.csrfToken()
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





module.exports.webReadDataUser = async (req, res) => {


    const page = Number.parseInt(req.query.page);
    const size = Number.parseInt(req.query.size);

    const limit = size ? +size : 5;

    const user = await User.findOne({ where: { id: req.user.userId } });

    const dataUser = await User.findAndCountAll({
        limit: limit,
        offset: page ? page * limit : 0
    });

    res.render('pages/user/index', {
        title: 'Data User',
        layout: 'layouts/app',
        user: user,
        dataUser: dataUser.rows,
        totalPages: Math.ceil(dataUser.count / Number.parseInt(limit))
    })
}

module.exports.webProfile = async (req, res) => {

    const user = await User.findOne({ where: { id: req.user.userId } });

    res.locals.message = req.flash();

    res.render('pages/user/profile', {
        title: 'Profile',
        layout: 'layouts/app',
        user: user
    })

}

module.exports.webDetailUser = async (req, res) => {

    const user = await User.findOne({ where: { id: req.user.userId } });
    const dataUser = await User.findOne({ where: { id: req.params.id } });

    res.locals.message = req.flash();

    res.render('pages/user/detail', {
        title: 'Detail User',
        layout: 'layouts/app',
        user: user,
        dataUser: dataUser
    })

}


module.exports.webEditProfile = async (req, res) => {


    const user = await User.findOne({ where: { id: req.user.userId } })

    res.render('pages/user/edit', {
        title: "Edit Profile",
        layout: 'layouts/app',
        user: user,
        csrfToken: req.csrfToken()
    })

}


module.exports.webUpdateProfile = async (req, res) => {


    let files = req.file;

    try {

        if (!files) {

            let users = {
                name: req.body.name,
                phone: req.body.phone,
            }

            await User.update(users, { where: { id: req.params.id } })
            req.flash('success', 'Update Profile Successfully');
            res.redirect('/profile')

        } else {


            let users = {
                name: req.body.name,
                phone: req.body.phone,
                photo: req.file.filename
            }

            await User.update(users, { where: { id: req.params.id } })
            req.flash('success', 'Update Profile Successfully');
            res.redirect('/profile')
        }

    } catch {
        req.flash('error', 'Failed Update Profile');
        res.redirect('/profile')
    }


}


module.exports.webEditPassword = async (req, res) => {

    const user = await User.findOne({ where: { id: req.user.userId } })

    res.locals.message = req.flash();

    res.render('pages/user/password', {
        title: 'Edit Password',
        layout: 'layouts/app',
        user: user,
        csrfToken: req.csrfToken()
    })

}


module.exports.webUpdatePassword = async (req, res) => {

    await User.findOne({ where: { id: req.user.userId } })
        .then(user => {
            if (user && !bcrypt.compareSync(req.body.old_password, user.password)) {
                req.flash('error', 'Password Dont Match!')
                res.redirect('/user/password')
            } else if (req.body.new_password !== req.body.repeat_password) {
                req.flash('error', 'Repeat Password Dont Match!')
                res.redirect('/user/password')
            } else {
                let users = {
                    password: bcrypt.hashSync(req.body.new_password, 10)
                }

                User.update(users, { where: { id: req.params.id } })
                req.flash('success', 'Update Password Successfully');
                res.redirect('/user/password')
            }
        })
        .catch(err => {
            req.flash('error', `Error Update Password ${err}`)
            res.redirect('/user/password');
        })

}

module.exports.webLogout = async (req, res) => {

    res.clearCookie('jwt');
    res.clearCookie('_csrf');
    res.redirect('/')

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