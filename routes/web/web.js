const express = require('express');
const router = express.Router();

const authMiddleware = require('../../middleware/Auth');
const imageUserMiddleware = require('../../middleware/imageUserMiddleware');
const categoryImageMiddleware = require('../../middleware/categoryImageMiddleware');
const productImageMiddleware = require('../../middleware/productImageMiddleware');
const csrfProtection = require('../../middleware/csrfProtection');

const UserController = require('../../controller/UserController');
const DashboardController = require('../../controller/DashboardController');
const RoleController = require('../../controller/RoleController');
const UserRoleController = require('../../controller/UserRoleController');
const CategoryController = require('../../controller/CategoryController');
const ProductController = require('../../controller/ProductController');





router.get('/login', csrfProtection, UserController.webLogin);
router.get('/register', csrfProtection, UserController.webRegister);
router.post('/login', csrfProtection, UserController.webPostLogin);
router.post('/register', csrfProtection, UserController.webPostRegister);

router.get('/logout', authMiddleware, UserController.webLogout);

// user
router.get('/profile', authMiddleware, UserController.webProfile);
router.get('/profile/:id/edit', authMiddleware, csrfProtection, UserController.webEditProfile);
router.post('/profile/:id', authMiddleware, csrfProtection, ...imageUserMiddleware, UserController.webUpdateProfile);
router.get('/user/password', authMiddleware, csrfProtection, UserController.webEditPassword);
router.post('/user/password/:id', authMiddleware, csrfProtection, UserController.webUpdatePassword);
router.get('/user/list', authMiddleware, UserController.webReadDataUser);
router.get('/user/:id/detail', authMiddleware, UserController.webDetailUser);

// dashboard
router.get('/home', authMiddleware, DashboardController.webReadDashboard);

// role
router.post('/role/add', authMiddleware, csrfProtection, RoleController.webCreatedRole);
router.get('/role', authMiddleware, csrfProtection, RoleController.webReadRole);
router.post('/role/:id', authMiddleware, csrfProtection, RoleController.webUpdateRole);
router.get('/role/:id/edit', authMiddleware, csrfProtection, RoleController.webEditRole);
router.post('/role/:id/delete', authMiddleware, csrfProtection, RoleController.webRemoveRole)


// roleuser
router.post('/roleuser/add', authMiddleware, csrfProtection, UserRoleController.webCreatedRoleUser);
router.get('/roleuser', authMiddleware, csrfProtection, UserRoleController.webReadRoleUser);
router.get('/roleuser/:id/edit', authMiddleware, csrfProtection, UserRoleController.webEditRoleUser);
router.post('/roleuser/:id', authMiddleware, csrfProtection, UserRoleController.webUpdateRoleUser);

// category
router.post('/category/add', authMiddleware, csrfProtection, ...categoryImageMiddleware, CategoryController.webCreatedCategory);
router.get('/category', authMiddleware, csrfProtection, CategoryController.webReadCategory);
router.post('/category/:id', authMiddleware, csrfProtection, ...categoryImageMiddleware, CategoryController.webUpdateCategory);
router.get('/category/:id/edit', authMiddleware, csrfProtection, CategoryController.webEditCategory);
router.post('/category/:id/delete', authMiddleware, csrfProtection, CategoryController.webRemoveCategory);


// product
router.post('/product/add', authMiddleware, ...productImageMiddleware, ProductController.webCreatedProduct);
router.get('/product', authMiddleware, ProductController.webReadProduct);
router.post('/product/:id', authMiddleware, ...productImageMiddleware, ProductController.webUpdateProduct);
router.get('/product/:id/edit', authMiddleware, ProductController.webEditProduct);
router.post('/product/:id/delete', authMiddleware, ProductController.webRemoveProduct);

module.exports = router;