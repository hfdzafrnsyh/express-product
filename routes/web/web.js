const express = require('express');
const router = express.Router();

const UserController = require('../../controller/UserController');
const DashboardController = require('../../controller/DashboardController');

const AuthApi = require('../../middleware/AuthApi');


router.get('/login', UserController.webLogin);
router.get('/register', UserController.webRegister);
router.post('/login', UserController.webPostLogin);
router.post('/register', UserController.webPostRegister);


router.get('/home', DashboardController.webReadDashboard);

module.exports = router;