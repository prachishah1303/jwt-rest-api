const config = require('../config');

const providers = ['twitter', 'google', 'facebook', 'github']

const callbacks = providers.map(provider => {
  return process.env.NODE_ENV === 'production'
    ? `https://localhost:8000/${provider}/callback`
    : `https://localhost:8000/${provider}/callback`
})

const [twitterURL, googleURL, facebookURL, githubURL] = callbacks

exports.CLIENT_ORIGIN = process.env.NODE_ENV === 'production'
  ? ['https://127.0.0.1:8000', 'https://localhost:8000']
  : ['https://127.0.0.1:8000', 'https://localhost:8000']

exports.TWITTER_CONFIG = {
  consumerKey: process.env.TWITTER_KEY || config.TWITTER_KEY,
  consumerSecret: process.env.TWITTER_SECRET || config.TWITTER_SECRET,
  callbackURL: twitterURL,
}

exports.GOOGLE_CONFIG = {
  clientID: process.env.GOOGLE_KEY || config.GOOGLE_KEY,
  clientSecret: process.env.GOOGLE_SECRET || config.GOOGLE_SECRET,
//   callbackURL: googleURL
}

exports.FACEBOOK_CONFIG = {
  clientID: process.env.FACEBOOK_KEY || config.FACEBOOK_KEY,
  clientSecret: process.env.FACEBOOK_SECRET || config.FACEBOOK_SECRET,
  passReqToCallback: true,
  // profileFields: ['id', 'emails', 'name', 'picture.width(250)'],
  // callbackURL: facebookURL
}

exports.GITHUB_CONFIG = {
  clientID: process.env.GITHUB_KEY || config.GITHUB_KEY,
  clientSecret: process.env.GITHUB_SECRET || config.GITHUB_SECRET,
  callbackURL: githubURL
}