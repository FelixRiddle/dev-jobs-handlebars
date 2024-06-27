const passport = require("passport");
const LocalStrategy = require("passport-local");

const User = require("../../model/User");

passport.use(new LocalStrategy({
	usernameField: "email",
    passwordField: "password",
    passReqToCallback: true,
}, async (req, email, password, done) => {
	try {
        const user = await User.findOne({ email });
        if(!user) {
            return done(null, false, {
				messages: [{
					message: "Incorrect email or password",
					error: true,
				}]
            });
        }
        if(!user.validatePassword(password)) {
            return done(null, false, {
				messages: [{
					message: "Incorrect email or password",
					error: true,
				}]
            });
        }
        return done(null, user);
    } catch(err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => done(null, user._id));

passport.deserializeUser(async (id, done) => {
	try {
        const user = await User.findById(id);
        return done(null, user);
    } catch(err) {
        return done(err);
    }
});

module.exports = passport;
