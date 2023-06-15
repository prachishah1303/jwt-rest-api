const express = require('express');
const router = new express.Router();
const passport = require('passport');
const authController = require('./../controllers/AuthController');

var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

const passportSignIn = passport.authenticate('local', { session: false });

router.post('/register', jsonParser,  authController.userRegister);
router.post('/login', passportSignIn,  jsonParser, authController.userLogin);


// Setting up the passport middleware for each of the OAuth providers
const twitterAuth = passport.authenticate('twitter')
const googleAuth = passport.authenticate('googleToken', { session: false })
const facebookAuth = passport.authenticate('facebookToken', { session: false })
const githubAuth = passport.authenticate('github')

// Routes that are triggered on the client
router.post('/google', googleAuth, authController.googleOAuth);
router.post('/facebook', facebookAuth, authController.facebookOAuth);
// router.post('/twitter', twitterAuth);
// router.post('/github', githubAuth);

module.exports = router;