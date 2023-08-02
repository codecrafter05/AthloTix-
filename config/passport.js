const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');
// new code below
passport.use(new GoogleStrategy(
    // Configuration object
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK
    },
    // The verify callback function...
    // Marking a function as an async function allows us
    // to consume promises using the await keyword
    async function(accessToken, refreshToken, profile, cb) {
      // When using async/await  we use a
      // try/catch block to handle an error
      try {
        // A user has logged in with OAuth...
        let user = await User.findOne({ email: profile.emails[0].value });
        // Existing user found, so provide it to passport
        if (user){
          user.googleId = profile.id;
          user.name = profile.displayName;
          user.avatar = profile.photos[0].value;
          user = await user.save();
          return cb(null, user);
        } 
        // We have a new user via OAuth!
        user = await User.create({
          name: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
          avatar: profile.photos[0].value
        });
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  ));
  // Add to bottom of config/passport.js
passport.serializeUser(function(user, cb) {
    cb(null, user._id);
  });
// Add to bottom of config/passport.js
passport.deserializeUser(async function(userId, cb) {
    // It's nice to be able to use await in-line!
    cb(null, await User.findById(userId));
  });
    






