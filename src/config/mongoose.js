const config = require( "./index" );
const mongoose = require( "mongoose" );

module.exports = function( app ) {
    mongoose.connect( config.mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
    }).then(() => {
        console.log("connection is successful")
    }).catch(() => {
        console.log("No connection")
    });

    mongoose.Promise = global.Promise;

    process.on( "SIGINT", cleanup );
    process.on( "SIGTERM", cleanup );
    process.on( "SIGHUP", cleanup );

    if ( app ) {
        app.set( "mongoose", mongoose );
    }
};

function cleanup( ) {
    mongoose.connection.close( function( ) {
        process.exit( 0 );
    } );
}
