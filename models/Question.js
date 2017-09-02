var mongoose = require("mongoose");

//QUESTION - TITLE,course,module,date,content,isSolved

var questionSchema = new mongoose.Schema({

title: String,
course: String,
module: String,
content: String,
CreatedAt: {type: Date, default: Date.now},
isSolved: false,
 answers: [
{
   type: mongoose.Schema.Types.ObjectId,
   ref: "Answer"



}
]


});

module.exports = mongoose.model("Question",questionSchema);