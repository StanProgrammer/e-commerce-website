const express = require('express');
const router = express.Router();
const {UserSignUp} = require('../controllers/UserSignUp');
const { UserSignIn } = require('../controllers/UserSignIn');
const UserDetails = require('../controllers/UserDetails');
const authToken = require('../middlewares/auth');
const UserLogOut = require('../controllers/UserLogOut');
const AllUsers = require('../controllers/AllUsers');
const { UserUpdate } = require('../controllers/UserUpdate');

router.post('/signup', UserSignUp);
router.post('/signin', UserSignIn);
router.get('/user-details',authToken,UserDetails)
router.get('/user-logout',UserLogOut)
router.post('/update-user',authToken,UserUpdate)
router.delete('/delete-user/:id',authToken,)


//admin-panel
router.get('/all-users',authToken,AllUsers)

module.exports = router