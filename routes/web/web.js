const express = require('express');
const router = express.Router();

const UserController = require('../../controller/UserController');
const DashboardController = require('../../controller/DashboardController');
const RoleController = require('../../controller/RoleController');
const UserRoleController = require('../../controller/UserRoleController');

const authMiddleware = require('../../middleware/Auth');
const imageUserMiddleware = require('../../middleware/imageUserMiddleware');


router.get('/login', UserController.webLogin);
router.get('/register', UserController.webRegister);
router.post('/login', UserController.webPostLogin);
router.post('/register', UserController.webPostRegister);

router.get('/logout', authMiddleware, UserController.webLogout);

// user
router.get('/profile', authMiddleware, UserController.webProfile);
router.get('/profile/:id/edit', authMiddleware, UserController.webEditProfile);
router.post('/profile/:id', authMiddleware, ...imageUserMiddleware, UserController.webUpdateProfile);
router.get('/user/password', authMiddleware, UserController.webEditPassword);
router.post('/user/password/:id', authMiddleware, UserController.webUpdatePassword);
router.get('/user/list', authMiddleware, UserController.webReadDataUser);

// dashboard
router.get('/home', authMiddleware, DashboardController.webReadDashboard);

// role
router.post('/role/add', authMiddleware, RoleController.webCreatedRole);
router.get('/role', authMiddleware, RoleController.webReadRole);
router.post('/role/:id', authMiddleware, RoleController.webUpdateRole);
router.get('/role/:id/edit', authMiddleware, RoleController.webEditRole);
router.post('/role/:id', authMiddleware, RoleController.webRemoveRole)


// roleuser
router.post('/roleuser/add', authMiddleware, UserRoleController.webCreatedRoleUser);
router.get('/roleuser', authMiddleware, UserRoleController.webReadRoleUser);
router.get('/roleuser/:id/edit', authMiddleware, UserRoleController.webEditRoleUser);
router.post('/roleuser/:id', authMiddleware, UserRoleController.webUpdateRoleUser);

module.exports = router;