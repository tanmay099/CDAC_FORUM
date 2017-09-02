var mongoose = require("mongoose");
var User = require("./samplemodel.js");


var data = [
   { 
  email: 'my09@gmail.com',
  password: '1234',
   Questions:
   [ { title: 'Null Pointer Exption',
       content: 'i am facing the code error bla bla in this quesion anybody help me solve the code',
       module: 'android',
       course: 'dmc',
       },
     { title: 'UI exeption error',
       content: 'i am facing the code error bla bla in this quesion anybody help me solve the code',
       module: 'IOS',
       course: 'dmc',
        } ] }
,
   { 
  email: 'tanmay09@gmail.com',
  password: '123654654',
   Questions:
   [ { title: 'command not fount exeption',
       content: 'i am facing the code error bla bla in this quesion anybody help me solve the code',
       module: 'linux',
       course: 'dmc',
       },
     { title: 'package node found',
       content: 'i am facing the code error bla bla in this quesion anybody help me solve the code',
       module: 'Hybrid',
       course: 'dmc',
        } ] }

]


function seedDB() {
	
User.remove({},function(err){
	if(err){
    console.log(err);
     }
console.log("user removed");
    });

//add a new user
data.forEach(function(seed){
User.create({seed, function(err,data){
if(err){
console.log(err);

}else{
console.log("added a campground");

}


}
});
});
}
seedDB();