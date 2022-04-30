const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const methodOverride = require('method-override');
const expressEjsLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const path = require('path');
const morgan = require('morgan');


const PORT = process.env.PORT || 5000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

// buat css
app.use(express.static(__dirname + '/public'));

// buat path narik image
app.use('/public', express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs');
app.use(expressEjsLayouts);

app.use(morgan('tiny'))

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


// method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
        // look in urlencoded POST bodies and delete it
        var method = req.body._method
        delete req.body._method
        return method
    }
}))

require('dotenv').config();

const routes = require('./routes/routes');
routes(app);


app.listen(PORT, () => {
    console.log(`Server run in port ${PORT}`);
})