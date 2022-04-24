const express = require('express');
const router = express.Router();

const UserController = require('../../controller/UserController');
const DashboardController = require('../../controller/DashboardController');
const RoleController = require('../../controller/RoleController');

const authMiddleware = require('../../middleware/Auth');


router.get('/login', UserController.webLogin);
router.get('/register', UserController.webRegister);
router.post('/login', UserController.webPostLogin);
router.post('/register', UserController.webPostRegister);


router.get('/home', authMiddleware, DashboardController.webReadDashboard);
router.get('/role', authMiddleware, RoleController.webReadRole);
router.post('/role/:id', authMiddleware, RoleController.webRemoveRole)

module.exports = router;