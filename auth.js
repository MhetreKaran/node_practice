const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Person = require("./models/person");

passport.use(
    new LocalStrategy(async (userName, password, done) => {
      //authentication logic here
      try {
        // console.log("received credentials:", userName, password);
        const user = await Person.findOne({ username: userName });
        if (!user) return done(null, false, { message: "Incorrect username." });
  
        const isPasswordMatch = await user.comparePassword(password);
        if (isPasswordMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password." });
        }
      } catch (error) {
        done(error);
      }
    })
  );

  module.exports = passport;