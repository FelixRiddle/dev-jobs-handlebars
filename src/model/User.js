const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
	email: {
		type: String,
		unique: true,
		lowercase: true,
		trim: true,
	},
	name: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
		trim: true,
	},
	token: String,
	expires: Date
});

// Method to hash passwords
userSchema.pre("save", function(next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
	
	// Hash the password before saving it to the database
    bcrypt.hash(user.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        user.password = hash;
        next();
    });
});

userSchema.post("save", function(err, doc, next) {
	try {
		if(err.name === "MongoError" && err.code === 11000) {
			return next("The given E-Mail is taken");
		}
		
		return next(err);
	} catch(error) {
		return next(err);
	}
});

const User = mongoose.model("User", userSchema);
module.exports = User;
