var mongoose = require("mongoose");
var passportLocalMongooose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({

username: String,
password: String,
email:  String,  
Questions: [
{
type: mongoose.Schema.Types.ObjectId,
ref: "Question"
}

]

});
UserSchema.plugin(passportLocalMongooose);
module.exports = mongoose.model("User" , UserSchema);
