var express=require("express");
var mongoose=require("mongoose"),
    passport=require("passport"),
    User=require("./models/user"),
    LocalStrategy=require("passport-local"),
    passportLocalMongoose=require("passport-local-mongoose")

var app=express();

mongoose.connect("mongodb://localhost/auth_demo_app");
app.use(require("express-session")({
    secret:"Rusty is the cutest",
    resave:false,
    saveUninitialized: false

}));
app.set('view engine','ejs');
var bodyParser=require("body-parser");
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get("/secret",function(){
    res.render("secret");
})
app.get("/",function(req,res){
    res.render("home");
});

app.listen("3000",function(){
    console.log("serving passport on port 3000");
})
