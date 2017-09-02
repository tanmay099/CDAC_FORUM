//initalise requires
var PORT = 3000;
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var Answer = require("./models/answer");
var Question = require("./models/Question");
var User = require("./models/user");
var mongoose = require("mongoose");
var fs = require("fs");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var passportLocalMongooose = require("passport-local-mongoose");



//connecting to mongooose
mongoose.connect("mongodb://localhost/cdac_demo");

app.use(require("express-session")({
    secret: "cdac forum session",
    resave: false,
    savUninitialized: false

}));
//intializing app.uses
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//createing mongodb schema






//intialising routes

//index route
// app.get("/", function(req,res){

// res.render("index");

// });
//**************
//ROUTES
//**************

//INDEX - show all questons
app.get("/questions", function(req, res){
    // Get all  from DB
    Question.find({}, function(err, allQuestions){
       if(err){
           console.log(err);
       } else {
          res.render("index",{questions:allQuestions});

}
});
//INDEX - show all questons
app.get("/AboutUs", function(req, res){
   
          res.render("AboutUs");

}
);


    //CREATE - add new question to DB
app.post("/quests", function(req, res){
    
    var name = req.body.course;
    var cours = name.split("string:");
    var module = req.body.module;
    var modul = module.split("string:");
    var content = req.body.query;
    var title = req.body.title;
    // var date =  new Date();
    // var dated = date.toString().split("GMT+0530 (India Standard Time)");

    var newQuestion = {course: cours, module: modul, content: content,title: title, isSolved: false}
    // Create a new campground and save to DB
    Question.create(newQuestion, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            
            res.redirect("/questions");
        }
    });
});


});
// SHOW - shows more info about one question
app.get("/questions/:id", function(req, res){
    //find the campground with provided ID
    Question.findById(req.params.id).populate("answers").exec(function(err, foundQuestion){
        if(err){
            console.log(err);
        } else {
            console.log(foundQuestion);
            //render show template with that campground
            res.render("show", {question: foundQuestion});
        }
    });
})
//new ansers
app.get("/questions/:id/answers/new", function(req, res){
    // find campground by id
    Question.findById(req.params.id, function(err, question){
        if(err){
            console.log(err);
        } else {
             res.render("answer/new", {question: question});
        }
    })
});

app.post("/questions/:id/answers",isLoggedIn, function(req, res){
   //lookup questions using ID
   Question.findById(req.params.id, function(err, question){
       if(err){
           console.log(err);
           res.redirect("/questions");
       } else {
        Answer.create(req.body.answer, function(err, answer){
           if(err){
               console.log(err);
           } else {
               question.answers.push(answer);
               question.save();
               res.redirect('/questions/' + question._id);
           }
        });
       }
   });
});



//Auth route
app.get("/register",function(req,res) {

res.render("register");
	
});
//handling user signup
app.post("/register",function(req,res) {
   req.body.username
   req.body.email
   User.register(new User({username: req.body.username,email: req.body.email}),req.body.password, function(err, user){
if(err){
	console.log(err);
	return res.render("register");
}
passport.authenticate("local")(req,res, function(){

res.redirect("/ask");
});

   });

	
});




//login routes
//render login form
app.get("/login", function(req,res){

res.render("login");

});
//login logic
//middleware passort.authenticate
app.post("/login",passport.authenticate("local",{
successRedirect: "/ask",
failureRedirect: "/login"
}),function(req,res){

});
//sign up routes
app.get("/signup", function(req,res){

res.render("signup");

});
//ask question
app.get("/ask", isLoggedIn ,function(req,res){
	
res.render("askQuestion");

});

//logout
app.get("/logout", function(req,res){
req.logout();
res.redirect("/login");
});


function isLoggedIn(req,res,next) {
	if(req.isAuthenticated()){
		return next();
	}
res.redirect("/login");

}

//port listening
app.listen(PORT,function(req,res){

console.log("server is listening on port"+PORT);


});