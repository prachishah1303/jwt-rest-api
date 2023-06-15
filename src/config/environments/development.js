module.exports = {
    host: "localhost",
    port: 8000, // change with development port
    mongoUrl: "mongodb://localhost:27017/jwtauth", // replace "projectDbName" with a proper db name
    logLevel: "debug", // can be chenged to error, warning, info, verbose or silly
    jwtSecret: "superSuperSecret",
    cryptoKey: 'password',
    cryptoAlgo: 'aes256',

    TWITTER_KEY: '',
    TWITTER_SECRET: '',

    GOOGLE_KEY: '1081907787007-320l45bq1a0bia51nn5t8t3ggr7e7g92.apps.googleusercontent.com',
    GOOGLE_SECRET: 'BS2LVMCZibbPDlZoE9ZXNElU',

    FACEBOOK_KEY: '464816864969643',
    FACEBOOK_SECRET: '39c2c5427d67df92ec442261e05b9590',

    GITHUB_KEY: '',
    GITHUB_SECRET: ''
};
