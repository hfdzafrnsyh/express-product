const express = require('express');
const router = express.Router();

const UserController = require('../../controller/UserController');
const DashboardController = require('../../controller/DashboardController');



router.get('/login', UserController.webLogin);
router.post('/login', UserController.webPostLogin);
router.get('/register', UserController.webRegister);
router.post('/register', UserController.webPostRegister);

router.get('/home', DashboardController.webReadDashboard);

module.exports = router;