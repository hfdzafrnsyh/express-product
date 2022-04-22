const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const expressEjsLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const path = require('path');
const csurf = require('csurf');


const PORT = process.env.PORT || 5000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.use(expressEjsLayouts);

// for flash message
app.use(cookieParser('secret'));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 6000
    }
}));

app.use(flash());


require('dotenv').config();


// app.use(csurf({ cookie: { httpOnly: true } }))

const routes = require('./routes/routes');
routes(app);

// app.use(function (err, req, res, next) {
//     if (err.code !== 'EBADCSRFTOKEN') return next(err)

//     // handle CSRF token errors here
//     res.status(403)
//     res.send('form tampered with')
// })



app.listen(PORT, () => {
    console.log(`Server run in port ${PORT}`);
})