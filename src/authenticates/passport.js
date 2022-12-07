const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID = "976568541728-4v7bni8kflj9oivhsqcboi31dt4f47r7.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

const FACEBOOK_APP_ID = "869861124168685";
const FACEBOOK_APP_SECRET = "9096775c9246466d9ffca4261186e529";

passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, profile)
  }
));

passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "/auth/facebook/callback",
      },
      function (accessToken, refreshToken, profile, done) {
        done(null, profile);
      }
    ));

passport.serializeUser((user, done) => {
    done(null, user)
});

passport.deserializeUser((user, done) => {
    done(null, user)
})