const express = require('express');
const router = express.Router();
const {UserSignUp} = require('../controllers/UserSignUp');
const { UserSignIn } = require('../controllers/UserSignIn');
const UserDetails = require('../controllers/UserDetails');
const authToken = require('../middlewares/auth');
const UserLogOut = require('../controllers/UserLogOut');

router.post('/signup', UserSignUp);
router.post('/signin', UserSignIn);
router.get('/user-details',authToken,UserDetails)
router.get('/user-logout',UserLogOut)

module.exports = router