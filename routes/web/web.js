const express = require('express');
const router = express.Router();

const UserController = require('../../controller/UserController');
const DashboardController = require('../../controller/DashboardController');
const RoleController = require('../../controller/RoleController');
const UserRoleController = require('../../controller/UserRoleController');
const CategoryController = require('../../controller/CategoryController');
const ProductController = require('../../controller/ProductController');

const authMiddleware = require('../../middleware/Auth');
const imageUserMiddleware = require('../../middleware/imageUserMiddleware');
const categoryImageMiddleware = require('../../middleware/categoryImageMiddleware');
const productImageMiddleware = require('../../middleware/productImageMiddleware');



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

// category
router.post('/category/add', authMiddleware, ...categoryImageMiddleware, CategoryController.webCreatedCategory);
router.get('/category', authMiddleware, CategoryController.webReadCategory);
router.post('/category/:id', authMiddleware, ...categoryImageMiddleware, CategoryController.webUpdateCategory);
router.get('/category/:id/edit', authMiddleware, CategoryController.webEditCategory);
router.post('/category/:id/delete', authMiddleware, CategoryController.webRemoveCategory);


// product
router.post('/product/add', authMiddleware, ...productImageMiddleware, ProductController.webCreatedProduct);
router.get('/product', authMiddleware, ProductController.webReadProduct);
// router.post('/product/:id', authMiddleware, ...productImageMiddleware, ProductController.webUpdateProduct);
// router.get('/product/:id/edit', authMiddleware, ProductController.webEditProduct);
// router.post('/product/:id', authMiddleware, ProductController.webRemoveProduct);

module.exports = router;