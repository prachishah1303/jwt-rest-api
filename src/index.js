const express = require('express');
const app = express();
var bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('passport');
const config = require( "./config" );
const customResponses = require( "./middlewares/customResponses" );
const logger = require( "./utilities/logger" );

const authRouter = require('./routers/auth');
const userRouter = require('./routers/users');

const port = process.env.PORT || config.port;
const ENV = process.env.NODE_ENV || config.env;

app.set( "env", ENV );

// const swaggerJsDoc = require('swagger-jsdoc');
// const swaggerUI = require('swagger-ui-express');

// const swaggerOptions = {
//     swaggerDefinition: {
//         info: {
//             title: 'JWT API',
//             version: '1.0.0'
//         }
//     },
//     apis: ['index.js'],
// }

// const swaggerDocs = swaggerJsDoc(swaggerOptions);

// /**
//  * @swagger
//  */

//middlewares
app.use( bodyParser.json( ) );
app.use( customResponses );
app.use(morgan('dev'));

require( "./config/mongoose" )( app );

app.use( "/", authRouter );
app.use( "/user", userRouter ); 

app.use(passport.initialize());
app.use(passport.session());

app.use( ( req, res ) => {
    res.notFound( );
} );

app.use( ( err, req, res, next ) => {
    logger.error( err.stack );
    next( err );
} );

// Don't remove next !!!!
app.use( ( err, req, res, next ) => {
    res.status( 503 ).json( {
        success: false,
        error: "server_error",
    } );
} );

const response = fetch('https://server.com/user/1')
 .then(response => response.json())
 .then(json => json)

console.log(response.name)


app.listen( port, ( ) => {
    console.log( `Listening on port ${ port }` );
} );