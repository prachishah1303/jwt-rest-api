const express = require('express');
const router = new express.Router();
const passport = require('passport');
const UserController = require('./../controllers/UserController');
const verifyToken = require( "./../middlewares/verifyToken" );
const passportConf = require('./../config/passport_init');

const passportJWT = passport.authenticate('jwt', { session: false });

router.get('/getAll',  passportJWT,  UserController.getAllUsersList);

module.exports = router;