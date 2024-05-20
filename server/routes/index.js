const express = require('express');
const router = express.Router();
const {UserSignUp} = require('../controllers/UserSignUp');
const { UserSignIn } = require('../controllers/UserSignIn');
const UserDetails = require('../controllers/UserDetails');
const authToken = require('../middlewares/auth');

router.post('/signup', UserSignUp);
router.post('/signin', UserSignIn);
router.get('/user-details',authToken,UserDetails)


module.exports = router