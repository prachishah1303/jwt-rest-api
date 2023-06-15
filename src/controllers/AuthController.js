const jwt = require('jsonwebtoken');
var crypto = require('crypto');

const User = require("./../models/users");
const config = require( "./../config" );

const logger = require( "./../utilities/logger" );

// function signInToken(user) {
//     jwt.sign({user}, config.jwtSecret, {expiresIn: '300s'}, (err, token) => {
//         return token
//     });
// }

signInToken = user => {
    return jwt.sign({user}, config.jwtSecret, {expiresIn: '300s'});
}

  
/**
 * Used for do register for user
 * @param {*} req 
 * @param {*} res 
 */
const userRegister = (req, res) => {
    const user = new User({
        // _id: new mongoose.Types.ObjectId(),
        method: 'local',
        local: {
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            password: req.body.password,
        }
    });
    
    user.save()
    .then(async (result) => {
        const token = await signInToken(result);
        res.success(token);
    })
    .catch(err => {
        console.log(err);
        res.send( err );
    });
  }

/**
 * Used for do login for user
 * @param {*} req 
 * @param {*} res 
 */
const userLogin = async (req, res) => {
    const result = req.user;
    if (result) {
        const token = await signInToken(result);
        res.success(token);
        logger.info('Login successfully');
    } else {
        res.status(500).json({
            status: false,
            message: 'Invalid user or user not exist'
        })
    }
}

const googleOAuth = async (req, res) => {
    const result = req.user;
    console.log('result', result);
    if (result) {
        const token = await signInToken(result);  
        console.log('token', token);      
        res.success(token);        
    } else {
        res.status(500).json({
            status: false,
            message: 'Invalid user or user not exist'
        })
    }
}

const facebookOAuth =  async (req, res) => {
    console.log('aaaaaaaaaaaaaaaa');
    const result = req.user;
    console.log('result', result);
    if (result) {
        const token = await signInToken(result);  
        console.log('token', token);      
        res.success(token);        
    } else {
        res.status(500).json({
            status: false,
            message: 'Invalid user or user not exist'
        })
    }
}

  module.exports = {
    userRegister,
    userLogin,
    googleOAuth,
    facebookOAuth
  }
