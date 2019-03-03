var express               =require("express"),
    mongoose              =require("mongoose"),
    passport              =require("passport"),
    User                  =require("./models/user"),
    LocalStrategy         =require("passport-local"),
    passportLocalMongoose =require("passport-local-mongoose");

var app=express();
mongoose.connect("mongodb://localhost/auth_demo_app");
app.use(require("express-session")({
    secret:"Rusty is the cutest",
    resave:false,
    saveUninitialized: false
    
}));
app.set('view engine','ejs');
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

///================
///   ROUTES
///================

app.get("/secret",function(req,res){
    res.render("secret");
})
app.get("/",function(req,res){
    res.render("home");
});

///AUTH ROUTES

//show sign up form
app.get("/register",function(req,res){
    res.render("register");
});
//user sign up
app.post("/register", function(req,res){
    /* req.body.username
    req.body.password */
    User.register(new User({username:req.body.username}),req.body.password,function(err,user){
        if(err){
            console.log(err);
            return res.render("register");

        }
        passport.authenticate("local")(req,res,function(){
            res.redirect("/secret");
        });
    });
});

app.listen("3000",function(){
    console.log("serving passport on port 3000");
});
