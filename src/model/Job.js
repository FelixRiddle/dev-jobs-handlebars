const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const slug = require("slug");
const shortid = require("shortid");

const jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: "The name of the title is required.",
        trim: true,
    },
    company: {
        type: String,
        trim: true,
    },
    location: {
        type: String,
        trim: true,
        required: "Location is required.",
    },
    salary: {
        type: Number,
        default: 0,
    },
    contract: {
        type: String,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    url: {
        type: String,
        trim: true,
    },
    skills: [String],
    candidates: [{
        name: String,
        email: String,
        cv: String,
    }],
	author: {
		type: mongoose.Schema.Types.ObjectId,
        ref: "User",
		required: "Author is required"
	}
});

jobSchema.pre('save', function(next) {
	const url = slug(this.title);
	this.url = `${url}-${shortid.generate()}`;
	
	next();
});

exports.contractTypes = [
	"full-time",
	"part-time",
	"freelance",
	"contract",
    "temporary",
    "internship",
    "apprenticeship",
    "volunteer",
];
module.exports = mongoose.model("job", jobSchema);
