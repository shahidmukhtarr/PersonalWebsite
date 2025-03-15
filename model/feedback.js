const mongoose = require("mongoose");

const FeedbackSchema = new mongoose.Schema({

name: {
    type: String,
},

comments: {
    type: String,
}

});

const Feedback = new mongoose.model("usersfeedback", FeedbackSchema);

module.exports = Feedback;