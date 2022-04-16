const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 5000;

app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

require('dotenv').config();

const routes = require('./routes/routes');
routes(app);

app.listen(PORT, () => {
    console.log(`Server run in port ${PORT}`);
})