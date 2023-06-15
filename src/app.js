const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const app = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var crypto = require('crypto');
var key = 'password';
var algo = 'aes256';

const User = require('./models/users');

const jwt = require('jsonwebtoken');
jwtKey = 'jwt';


//middlewares
app.use(jsonParser);
app.use(morgan('dev'));

mongoose.connect("mongodb://localhost:27017/jwtauth", {
    useCreateIndex: true, // 
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => {
    console.log("connection is successful")
}).catch(() => {
    console.log("No connection")
});

app.post('/register', jsonParser, function(req, res) {
    var cipher = crypto.createCipher(algo, key);
    var encrypted = cipher.update(req.body.password, 'utf8', 'hex')+cipher.final('hex');

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        password: encrypted,
    });

    user.save()
    .then(result => {
        jwt.sign({result}, jwtKey, {expiresIn: '300s'}, (err, token) => {
            res.status(201).json({token});
        });
        // res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
    });
})

app.post('/login', jsonParser, function(req, res) {
    User.findOne({email: req.body.email})
    .then((result) => {
        var decipher = crypto.createDecipher(algo, key);
        var decrypted = decipher.update(result.password, 'hex', 'utf8') + decipher.final('utf8');
        
        if (decrypted ===  req.body.password) {
            jwt.sign({result}, jwtKey, {expiresIn: '300s'}, (err, token) => {
                res.status(200).json({token});
            });
        } else {
            res.status(500).json({
                status: 0,
                message: 'Invalid user'
            })
        }
    })
    .catch(err => {
        console.log(err);
    });
})

app.get('/users', verifyToken, function(req, res) {
    User.find().then((data) => {
        res.status(200).json(data);
    })
});

app.get('/', function(req, res) {
    res.send('Hello');
});

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        req.token = bearer[1];
        jwt.verify(req.token, jwtKey, (err, authData) => {
            if (err) {
                res.json({result: err});
            } else {
                next();
            }
        });
    } else {
        res.send({
            result: 'Token not provided'
        })
    }
    next();
}

app.listen(5000);