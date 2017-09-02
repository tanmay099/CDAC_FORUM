var mongoose = require("mongoose");

var answerSchema = new mongoose.Schema({

content: String,
author: String

});

module.exports = mongoose.model("Answer", answerSchema);