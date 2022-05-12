const express = require('express');
const router = express.Router();
const cors = require('cors');
const authJwt = require('../../middleware/AuthApi');


const ProductController = require('../../controller/ProductController');
const CategoryController = require('../../controller/CategoryController');
const UserController = require('../../controller/UserController');
const RoleController = require('../../controller/RoleController');
const UserRoleController = require('../../controller/UserRoleController');


router.use(cors());


// authenticate
router.use(authJwt());

// user
router.get('/user', UserController.dataUser);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/forgotpassword', UserController.forgotPassword);
router.post('/resetpassword', UserController.resetPassword);

// role
router.get('/role', RoleController.readRole);
router.get('/role/:id', RoleController.detailRole);
router.post('/role/create', RoleController.createdRole);
router.put('/role/:id', RoleController.updateRole);

// userRole
router.get('/roleuser', UserRoleController.readUserRole);
router.post('/roleuser/create', UserRoleController.createdUserRole);
router.put('/roleuser/:id', UserRoleController.updateUserRole);


router.get('/category', CategoryController.readCategory);
router.get('/category/:id', CategoryController.detailCategory);
router.post('/category/create', CategoryController.createdCategory);
router.put('/category/:id', CategoryController.updateCategory);
router.get('/category/:id/product', CategoryController.readProductByCategory);


router.get('/product', ProductController.readProduct);
router.get('/product/:id', ProductController.detailProduct);
router.post('/product/create', ProductController.createdProduct);
router.put('/product/:id', ProductController.updateProduct);
router.delete('/product/:id', ProductController.removeProduct);


module.exports = router;