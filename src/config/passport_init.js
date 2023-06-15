const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const LocalStrategy = require('passport-local').Strategy;

const User = require("./../models/users");
const config = require("./../config");
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { Strategy: FacebookStrategy } = require('passport-facebook')

const GooglePlusTokenStrategy = require('passport-google-plus-token');
const FacebookTokenStrategy = require('passport-facebook-token');

// const { Strategy: GithubStrategy} = require('passport-github')
// const { Strategy: TwitterStrategy } = require('passport-twitter')

const { 
    TWITTER_CONFIG, GOOGLE_CONFIG, FACEBOOK_CONFIG, GITHUB_CONFIG
  } = require('./passport_config')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
};

// JSON web token 
passport.use(
    new JwtStrategy(opts, async (payload, done) => {
        // console.log('payload', payload);
        try {
            User.findById(payload.user._id)
                .then(user => {
                    if (user) {
                        return done(null, {
                            id: user.id,
                            name: user.name,
                            email: user.email,
                        });
                    }
                    return done(null, false);
                }).catch(err => console.error(err));
        } catch (error) {
            console.log('error', error);
            return done(error, false);
        }
    }))

// Local Strategy
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
},
    async (email, password, done) => {
        try {
            const user = await User.findOne({'local.email': email});
            if (!user) {
                return done(null, false);
            }

            const isMatch = await user.isValidPassword(password);

            if (!isMatch) {
                return done(null, false);
            }

            done(null, user);
        } catch (error) {
            return done(error, false);
        }
    }
));

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

const googleCallback = async (accessToken, refreshToken, profile, done) => {
    try {
        const existUser = await User.findOne({"google.id": profile.id});
        if (existUser) {
            return done(null, existUser);
        }

        const newUser = new User({
            method: 'google',
            google: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });
        await newUser.save()
        return done(null, newUser);
    } catch(error) {
        return done(null, false, error.message);
    }
};

const facebookCallback = async (req, accessToken, refreshToken, profile, done) => {
    try {
        const existUser = await User.findOne({"facebook.id": profile.id});
        if (existUser) {            
            return done(null, existUser);
        }

        const newUser = new User({
            method: 'facebook',
            facebook: {
                id: profile.id,
                email: profile.emails[0].value
            }
        });
        await newUser.save();
        return done(null, newUser);
    } catch(error) {
        return done(null, false, error.message);
    }
};

// Adding each OAuth provider's strategy to passport
passport.use('googleToken', new GooglePlusTokenStrategy(GOOGLE_CONFIG, googleCallback));
passport.use('facebookToken', new FacebookTokenStrategy(FACEBOOK_CONFIG, facebookCallback));
// passport.use(new GithubStrategy(GITHUB_CONFIG, callback));
// passport.use(new TwitterStrategy(TWITTER_CONFIG, callback));

