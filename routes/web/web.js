const express = require('express');
const router = express.Router();

const UserController = require('../../controller/UserController');
const DashboardController = require('../../controller/DashboardController');
const RoleController = require('../../controller/RoleController');
const UserRoleController = require('../../controller/UserRoleController');

const authMiddleware = require('../../middleware/Auth');


router.get('/login', UserController.webLogin);
router.get('/register', UserController.webRegister);
router.post('/login', UserController.webPostLogin);
router.post('/register', UserController.webPostRegister);


router.get('/home', authMiddleware, DashboardController.webReadDashboard);

// role
router.get('/role', authMiddleware, RoleController.webReadRole);
router.post('/role/:id', authMiddleware, RoleController.webRemoveRole)


// roleuser
router.get('/roleuser', authMiddleware, UserRoleController.webReadRoleUser);
router.get('/roleuser/:id/edit', authMiddleware, UserRoleController.webEditRoleUser);

module.exports = router;