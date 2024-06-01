const express = require('express');
const router = express.Router();
const {UserSignUp} = require('../controllers/user/UserSignUp');
const { UserSignIn } = require('../controllers/user/UserSignIn');
const UserDetails = require('../controllers/user/UserDetails');
const authToken = require('../middlewares/auth');
const UserLogOut = require('../controllers/user/UserLogOut');
const AllUsers = require('../controllers/user/AllUsers');
const { UserUpdate } = require('../controllers/user/UserUpdate');
const UploadProduct = require('../controllers/product/UploadProduct');
const GetProduct = require('../controllers/product/GetProduct');
const UpdateProduct = require('../controllers/product/UpdateProduct');
const DeleteProduct = require('../controllers/product/DeleteProduct');
const UserDelete = require('../controllers/user/UserDelete');
const GetCatPd = require('../controllers/product/GetCatPd');
const SingleProduct = require('../controllers/product/SingleProduct');
const CategoryWiseProduct = require('../controllers/product/CategoryWiseProduct');

router.post('/signup', UserSignUp);
router.post('/signin', UserSignIn);
router.get('/user-details',authToken,UserDetails)
router.get('/user-logout',UserLogOut)
router.post('/update-user',authToken,UserUpdate)
router.delete('/delete-user/:id',authToken,UserDelete)



//admin-panel
router.get('/all-users',authToken,AllUsers)

// product
router.post('/upload-product',UploadProduct)
router.get('/get-product',GetProduct)
router.put('/update-product/:id', UpdateProduct);
router.delete('/delete-product/:id', DeleteProduct);
router.get('/category-product',GetCatPd)
router.post('/category-wise',CategoryWiseProduct)


module.exports = router