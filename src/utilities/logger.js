const winston = require( "winston" );
const fs = require( "fs" );

const config = require( "../config" );

const tsFormat = ( ) => ( new Date( ) ).toLocaleTimeString( );
const logDir = "log";

if ( !fs.existsSync( logDir ) ) {
    fs.mkdirSync( logDir );
}

const logger = winston.createLogger( {
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new ( winston.transports.Console )( {
            colorize: true,
            timestamp: tsFormat,
            level: "debug",
        } ),
        new ( winston.transports.File )( {
            filename: `${ logDir }/results.log`,
            timestamp: tsFormat,
            level: process.env.LOG_LEVEL || config.logLevel,
        } ),
    ],
} );

module.exports = logger;
