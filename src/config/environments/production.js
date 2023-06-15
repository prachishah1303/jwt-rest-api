module.exports = {
    host: "localhost",
    port: 8000, // change with production port
    mongoUrl: "mongodb://localhost:27017/jwtauth", // replace "projectDbName" with a proper db name
    logLevel: "debug", // can be chenged to error, warning, info, verbose or silly
    jwtSecret: "superSuperSecret",
    cryptoKey: 'password',
    cryptoAlgo: 'aes256',

    TWITTER_KEY: '',
    TWITTER_SECRET: '',

    GOOGLE_KEY: '',
    GOOGLE_SECRET: '',

    FACEBOOK_KEY: '',
    FACEBOOK_SECRET: '',

    GITHUB_KEY: '',
    GITHUB_SECRET: ''
};
